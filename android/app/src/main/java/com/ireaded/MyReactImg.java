package com.ireaded;

import android.support.annotation.Nullable;

import com.facebook.drawee.backends.pipeline.Fresco;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.views.image.ReactImageView;
import com.ireaded.widget.CircularProgressButton;

/**
 * Created by Administrator on 2017/8/25.
 */

public class MyReactImg extends SimpleViewManager<ReactImageView>{
    @Override
    public String getName() {
        return "MyReactImg";
    }

    @Override
    protected ReactImageView createViewInstance(ThemedReactContext reactContext) {
        return new ReactImageView(reactContext, Fresco.newDraweeControllerBuilder(),null);
    }


    @ReactProp(name = "src")
    public void setProgress(CircularProgressButton view, @Nullable int src) {
        view.setProgress(src);
    }
}
