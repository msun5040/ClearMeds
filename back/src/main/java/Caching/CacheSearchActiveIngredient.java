package Caching;
//
// public class CacheSearchActiveIngredient {
//
// }

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import server.Exceptions.DatasourceException;
import server.FDADataSource;

/**
 * This is the CacheAPI class which effictevely caches the response from getBroadbandPercentage, so
 * as to reduce the amount of API calls especially if a specific call has been made before.
 */
public class CacheSearchActiveIngredient {
  private final LoadingCache<String, Map<String, Object>> cache;
  private final FDADataSource fdaDataSource;

  public CacheSearchActiveIngredient(
      int maximumSize, int minutesExpire, FDADataSource fdaDataSource) {
    this.fdaDataSource = fdaDataSource;

    // Look at the docs -- there are lots of builder parameters you can use
    //   including ones that affect garbage-collection (not needed for Server).
    this.cache =
        CacheBuilder.newBuilder()
            // How many entries maximum in the cache?
            .maximumSize(maximumSize)
            // How long should entries remain in the cache?
            .expireAfterWrite(minutesExpire, TimeUnit.MINUTES)
            // Keep statistical info around for profiling purposes
            .recordStats()
            .build(
                new CacheLoader<>() {

                  /**
                   * This is the load method, if a key does not exist inside of the cache, fill it
                   * in with the get broadbandPercentage If getBroadbandPercentage throws an error,
                   * propagate it back up.
                   *
                   * @return
                   * @throws DatasourceException
                   */
                  @Override
                  public Map<String, Object> load(String activeIngredient)
                      throws DatasourceException {
                    // the key is formatted as (state, county)
                    Map<String, Object> result = new HashMap<String, Object>();
                    result.put("result", fdaDataSource.searchActiveIngredient(activeIngredient));

                    LocalDateTime retrievalTime = LocalDateTime.now();
                    result.put("retrievalTime", retrievalTime.toString());

                    return result;
                    // the result is formated as , the (broadband percentage, the retrieval time)
                  }
                });
  }

  /**
   * this is the search method for the cache, which effectively calls load if the value doesn't
   * exist which then calls getBroadbandPercentage on the acsDataSource
   *
   * @return Map result -> DrugResponse; retrievalTime -> retrievalTime
   * @throws DatasourceException
   */
  public Map<String, Object> search(String activeIngredient) throws DatasourceException {
    // "get" is designed for concurrent situations; for today, use getUnchecked:

    try {
      return this.cache.getUnchecked(activeIngredient);
    } catch (Exception e) {
      //      used instance of to check what kind of exception was thrown, and then more formally
      // throw the
      //      datasource or badjson exception, to be handled in BroadbandHandler to put the
      // necessary responses in
      //      the response map.
      if (e.getCause() instanceof DatasourceException) {
        throw new DatasourceException(e.getMessage(), e.getCause());
      }
      //            if (e.getCause() instanceof BadJSONException) {
      //                throw new BadJSONException(e.getMessage(), e.getCause());
      //            }
    }
    // this should never be thrown as Datasource and BadJSON are caught above.
    throw new DatasourceException("error while searching");
  }
}
