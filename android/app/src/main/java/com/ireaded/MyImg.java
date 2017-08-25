package com.ireaded;

import android.support.annotation.Nullable;
import android.widget.ImageView;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

/**
 * Created by Administrator on 2017/8/25.
 */

public class MyImg extends SimpleViewManager<ImageView>{
    @Override
    public String getName() {
        return "MyImg";
    }

    @Override
    protected ImageView createViewInstance(ThemedReactContext reactContext) {
        return new ImageView(reactContext);
    }


    @ReactProp(name = "src")
    public void setProgress(ImageView view, @Nullable int src) {
        view.setImageResource(R.drawable.yes);
    }
}
