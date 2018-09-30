package club.tftinker.alternativeswearing;

import android.content.pm.ActivityInfo;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;

import java.io.IOException;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class MainActivity extends AppCompatActivity {

    public static final String TAG = MainActivity.class.getSimpleName();
    public static final String findInLogs = "TF123123";
    //public String list[][] = new String[][];

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT); // Make to run this application portrait mode only

        String serverURL = "https://home.tftinker.club:3000/";// Server URL

        updateList(serverURL);

        setupItemButtons();

        setupSetingsButton();

        Log.v(TAG, findInLogs + "Main Activity has Started");
    }

    private void setupSetingsButton() {
        final Button setingsButton = findViewById(R.id.setingsButton);
        setingsButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                alertUserAboutError("settings not done");
            }
        });
    }

    private void setupItemButtons(){
        final Button goodButton = findViewById(R.id.goodButton);
        goodButton.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                alertUserAboutError("goodButton not done");
            }
        });

        final Button badButton = findViewById(R.id.badButton);
        badButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                alertUserAboutError("badButton not done");
            }
        });
    }

    private void updateList(String serverURL) {
        String getListURL = serverURL + "list/get";// puting gether the url for geting the list

        OkHttpClient client = new OkHttpClient();
        Request request = new Request.Builder()
                .url(getListURL)
                .build();

        Call call = client.newCall(request);
        call.enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                Log.e(TAG,  findInLogs + "Failure caught: ", e);
                alertUserAboutError("Sorry app broken or server broken");
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                if (response.isSuccessful()){
                    Log.v(TAG, findInLogs + response.body().string());
                }else {
                    alertUserAboutError("There was an error. Please try again.");
                }
            }
        });
    }

    private void alertUserAboutError(String meg) {
        Log.v(TAG, findInLogs + "Error dialog show: " + meg);
        AlertDialogFragment dialog = new AlertDialogFragment();
        dialog.setMeg(meg);
        dialog.show(getFragmentManager(), "error_dialog");
    }
}
