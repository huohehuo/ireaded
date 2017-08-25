package com.ireaded;

import android.support.annotation.Nullable;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.ireaded.widget.WaveProgress;

/**
 * Created by Administrator on 2017/8/25.
 */

public class MyWave extends SimpleViewManager<WaveProgress>{
    @Override
    public String getName() {
        return "MyWave";
    }

    @Override
    protected WaveProgress createViewInstance(ThemedReactContext reactContext) {
        return new WaveProgress(reactContext);
    }


    @ReactProp(name = "src")
    public void setProgress(WaveProgress view, @Nullable int src) {
        view.setProgress(src);
    }
}
