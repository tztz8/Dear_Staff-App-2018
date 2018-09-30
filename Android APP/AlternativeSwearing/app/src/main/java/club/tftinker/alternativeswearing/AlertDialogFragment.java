package club.tftinker.alternativeswearing;

import android.app.AlertDialog;
import android.app.Dialog;
import android.app.DialogFragment;
import android.content.Context;
import android.os.Bundle;

public class AlertDialogFragment extends DialogFragment {
    private String meg;

    @Override
    public Dialog onCreateDialog(Bundle savedInstanceState) {
        //return super.onCreateDialog(savedInstanceState);
        Context context = getActivity();
        AlertDialog.Builder builder = new AlertDialog.Builder(context)
                .setTitle(R.string.error_title)
                .setMessage(getMeg())
                .setPositiveButton(R.string.error_button_text, null);
        AlertDialog dialog = builder.create();
        return dialog;
    }

    public void setMeg(String meg) {
        this.meg = meg;
    }

    private String getMeg() {
        return meg;
    }
}
