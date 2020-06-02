package com.immune;

import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.Bundle;
import android.os.IBinder;
import android.util.Log;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

    // Information about the service's state.
    // Prevents from unwanted unbinding.
    private boolean mShouldUnbind;

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "Immune";
    }

    /**
     * Creation method. Gets called when the gui gets started.
     * Responsible for binding to the service from the start.
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        bindService();
        super.onCreate(savedInstanceState);
    }

    /**
     * Destruction method. Gets called when the gui is being closed.
     * Responsible for unbinding from the service at the end of the app's lifecycle.
     */
    @Override
    protected void onDestroy() {
        unbindService();
        super.onDestroy();
    }

    /**
     * Helper method. Attempts to establish a connection with the service.
     */
    private void bindService() {
        if (bindService(new Intent(this, CertService.class),
                mConnection, Context.BIND_AUTO_CREATE)) {
            mShouldUnbind = true;
        } else {
            Log.e("CertService", "Error: The requested service doesn't " +
                    "exist, or this client isn't allowed access to it.");
        }
    }

    /**
     * Helper method. Releases information about the service's state.
     */
    private void unbindService() {
        if (mShouldUnbind) {
            unbindService(mConnection);
            mShouldUnbind = false;
        }
    }
    // To invoke the bound service, first make sure that this value is not null.
//    private CertService mBoundCertService;

    // This object is responsible for the connection with the service.
    private ServiceConnection mConnection = new ServiceConnection() {
        /**
         * This is called when the connection with the service has been established,
         * giving us the service object we can use to interact with the service.
         */
        public void onServiceConnected(ComponentName className, IBinder service) {
            //mBoundCertService = ((CertService.CertBinder)service).getService();
        }

        /**
         * This is called when the connection with the service has been
         * unexpectedly disconnected -- that is, its process crashed.
         */
        public void onServiceDisconnected(ComponentName className) {
            //mBoundCertService = null;
        }
    };
}
