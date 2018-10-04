package club.tftinker.alternativeswearing;

import android.content.Context;
import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONException;

import java.io.IOException;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class MainActivity extends AppCompatActivity {
    // Public
    public static final String TAG = MainActivity.class.getSimpleName();
    public static final String findInLogs = "TF123123";

    private String list[][] = {
            {"You don't have a fucking clue, do you?",
                    "I think you could do with more training"},
            {"She's a fucking power-crazy bitch",
                    "She's an aggressive go-getter."},
            {"And when the fuck do you expect me to do this?",
                    "Perhaps I can work late"}
    };

    //public String[][] getList() { return list; }

    // startup
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT); // Make to run this application portrait mode only

        String serverURL = "https://home.tftinker.club:3000/";// Server URL
        String user = "Timbre";// Username for the api
        String apiKey = "^bU%F%Ei1wjDddWzw&z&qiev2htt4Ua8%*KShhWch0tPCOcIjAfx$7nd#8uIrp23wgAda!kH5cbb9W$CjZ14R3xXy8&^NG@Do4ES";// api Key for the Username

        updateList(serverURL);

        setupItemButtons();

        setupSetingsButton();

        Log.v(TAG, findInLogs + "Main Activity has Started");
    }

    // private
    // buttons
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
        final Button badButton = findViewById(R.id.badButton);
        badButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //alertUserAboutError("badButton not done");
                Intent badListScreen = new Intent(v.getContext(), itemSelectFromList.class);
                startActivity(badListScreen);
            }
        });

        final Button goodButton = findViewById(R.id.goodButton);
        goodButton.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                alertUserAboutError("goodButton not done");
            }
        });
    }

    // List local
    private void setListbyJSON(String jsonStringData, Toast whenWell) throws JSONException {
        JSONArray listIn = new JSONArray(jsonStringData);
        //Log.v(TAG, findInLogs+listIn.toString());
        String outList[][] = new String[listIn.length()][2];
        //Log.v(TAG, findInLogs+listIn.getJSONArray(0).getString(0));
        for (int i = 0; i < listIn.length(); i++) {
            outList[i][0] = listIn.getJSONArray(i).getString(0);
            outList[i][1] = listIn.getJSONArray(i).getString(1);
        }
        list = outList;
        whenWell.show();
    }

    // network
    private void updateList(String serverURL) {
        final Toast whenWell = Toast.makeText(this, "List had be updated", Toast.LENGTH_SHORT);
        if(isNetworkAvailable()) {
            String getListURL = serverURL + "list/get";// puting gether the url for geting the list

            OkHttpClient client = new OkHttpClient();
            Request request = new Request.Builder()
                    .url(getListURL)
                    .build();

            Call call = client.newCall(request);
            call.enqueue(new Callback() {
                @Override
                public void onFailure(Call call, IOException e) {
                    Log.e(TAG, findInLogs + "Failure caught: ", e);
                    alertUserAboutError("Sorry app broken or server broken");
                }

                @Override
                public void onResponse(Call call, Response response) throws IOException {
                    try {
                        if (response.isSuccessful()) {
                            String jsonData = response.body().string();
                            setListbyJSON(jsonData, whenWell);
                        } else {
                            alertUserAboutError("There was an error. Please try again.");
                        }
                    }catch (JSONException e) {
                        Log.e(TAG, findInLogs + "Failure caught: ", e);
                        alertUserAboutError("Sorry the list from server is incorrect format");
                    } catch (IOException e){
                        Log.e(TAG, findInLogs + "Failure caught: ", e);
                        alertUserAboutError("Something when wrong with getting list");
                    }
                }
            });
        }else {
            Toast.makeText(this, R.string.network_not_found_toast_mag,
                    Toast.LENGTH_LONG).show();
        }
    }
    private boolean isNetworkAvailable() {
        ConnectivityManager manager = (ConnectivityManager)
                getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo networkInfo = manager.getActiveNetworkInfo();
        boolean isAvailable = false;
        if (networkInfo != null && networkInfo.isConnected()){
            isAvailable = true;
        }
        return isAvailable;
    }

    // pop up boxs
    private void alertUserAboutError(String meg) {
        Log.v(TAG, findInLogs + "Error dialog show: " + meg);
        AlertDialogFragment dialog = new AlertDialogFragment();
        dialog.setMeg(meg);
        dialog.show(getFragmentManager(), "error_dialog");
    }
}
