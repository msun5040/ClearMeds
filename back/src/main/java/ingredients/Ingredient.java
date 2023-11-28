package ingredients;

import soup.ActualFlavorException;
import soup.Soup;

/**
 * A soup ingredient. Different ingredient types may have differently shaped data.
 *
 * All fields of classes implementing this interface should be immutable.
 */
public interface Ingredient {
    /**
     * Add this ingredient to a given soup object. Exactly how the addition influences the soup is left
     * to the implementation of each Ingredient class.
     *
     * @param soup the soup state we're adding this ingredient to
     */
    void add(Soup soup) throws ActualFlavorException;
}
