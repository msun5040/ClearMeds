package server.Database;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import java.io.FileInputStream;
import java.io.IOException;

public class FirebaseInitializer {
  private Firestore db;

  public FirebaseInitializer() {
    try {
      initializeFirebase();
      initializeDatabase();
    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  public static void initializeFirebase() throws IOException {
    try {
      FileInputStream serviceAccount =
          new FileInputStream("data/private/clearmeds_private_key.json");

      FirebaseOptions options =
          new FirebaseOptions.Builder()
              .setCredentials(GoogleCredentials.fromStream(serviceAccount))
              .build();
      FirebaseApp.initializeApp(options);

    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  private void initializeDatabase() {
    this.db = FirestoreClient.getFirestore();
  }

  public Firestore getFirestore() {
    return this.db;
  }
}
