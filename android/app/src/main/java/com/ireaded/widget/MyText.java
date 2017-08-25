package com.ireaded.widget;

import android.support.annotation.Nullable;
import android.widget.TextView;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

/**
 * Created by Administrator on 2017/8/25.
 */

public class MyText extends SimpleViewManager<TextView>{
    @Override
    public String getName() {
        return "MyText";
    }

    @Override
    protected TextView createViewInstance(ThemedReactContext reactContext) {
        return new TextView(reactContext);
    }


    @ReactProp(name = "src")
    public void setText(TextView view, @Nullable String src) {
        view.setText("123121321");
    }

    @ReactProp(name = "textSize")
    public void setTextSize(TextView view, float fontSize) {
        view.setTextSize(fontSize);
    }
//
//    @ReactProp(name = "textColor", defaultInt = Color.BLACK)
//    public void setTextColor(TextView view, int textColor) {
//        view.setTextColor(textColor);
//    }
}
