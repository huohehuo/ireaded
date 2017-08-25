/*
 *  Copyright (C) 2015, gelitenight(gelitenight@gmail.com).
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
package com.ireaded.widget;

import android.animation.Animator;
import android.animation.AnimatorSet;
import android.animation.ObjectAnimator;
import android.animation.ValueAnimator;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapShader;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Matrix;
import android.graphics.Paint;
import android.graphics.Paint.Style;
import android.graphics.RectF;
import android.graphics.Shader;
import android.text.TextUtils;
import android.util.AttributeSet;
import android.view.View;
import android.view.animation.LinearInterpolator;

import com.ireaded.R;

import java.util.ArrayList;
import java.util.List;

public class WaveProgress extends View {
    //------------------------------
    private static final String TAG = "CircleProgressBar";

    private int mMaxProgress = 100;


    private final int mCircleLineStrokeWidth = 8;

    private final int mTxtStrokeWidth = 2;

    // 画圆所在的距形区域
    private RectF mRectF;

    private Paint cPaint;


    private String mTxtHint1="已使用";

    private String mTxtHint2="总流量";

    private String txt_total;

    private static String txt_getFlow="去购买套餐->";

    private int circleColor=getResources().getColor(R.color.circle_progress_five);//圆线默认颜色
    private AnimatorSet mAnimatorSet;
    private static final float DEFAULT_AMPLITUDE_RATIO = 0.05f;
    private static final float DEFAULT_WATER_LEVEL_RATIO = 0.5f;
    private static final float DEFAULT_WAVE_LENGTH_RATIO = 1.0f;
    private static final float DEFAULT_WAVE_SHIFT_RATIO = 0.0f;
    public static final int DEFAULT_BEHIND_WAVE_COLOR = Color.argb(20,80,226,193);
    public static final int DEFAULT_FRONT_WAVE_COLOR = Color.argb(30,80,226,193);
    public static final ShapeType DEFAULT_WAVE_SHAPE = ShapeType.CIRCLE;

    public enum ShapeType {
        CIRCLE,
        SQUARE
    }


    // shader containing repeated waves
    private BitmapShader mWaveShader;
    // shader matrix
    private Matrix mShaderMatrix;
    // paint to draw wave
    private Paint mViewPaint;
    // paint to draw border
    private Paint mBorderPaint;
    private Paint mBackgroundPaint;

    private float mDefaultAmplitude;
    private float mDefaultWaterLevel;
    private float mDefaultWaveLength;
    private double mDefaultAngularFrequency;

    private float mAmplitudeRatio = DEFAULT_AMPLITUDE_RATIO;
    private float mWaveLengthRatio = DEFAULT_WAVE_LENGTH_RATIO;
    private float mWaterLevelRatio = DEFAULT_WATER_LEVEL_RATIO;
    private float mWaveShiftRatio = DEFAULT_WAVE_SHIFT_RATIO;

    private int mBehindWaveColor = DEFAULT_BEHIND_WAVE_COLOR;
    private int mFrontWaveColor = DEFAULT_FRONT_WAVE_COLOR;
    private ShapeType mShapeType = DEFAULT_WAVE_SHAPE;

    public WaveProgress(Context context) {
        super(context);
        init();
    }

    public WaveProgress(Context context, AttributeSet attrs) {
        super(context, attrs);
        init();
    }

    public WaveProgress(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
        init();
    }

    private void init() {
        //----------------------------
        mRectF = new RectF();
        cPaint = new Paint();
        mShaderMatrix = new Matrix();
        mViewPaint = new Paint();
        mViewPaint.setAntiAlias(true);
        mBackgroundPaint=new Paint();
        mBackgroundPaint.setStyle(Style.FILL);
        mBackgroundPaint.setColor(Color.TRANSPARENT);
        initAnimation();
    }

    public float getWaveShiftRatio() {
        return mWaveShiftRatio;
    }

    /**
     * Shift the wave horizontally according to <code>waveShiftRatio</code>.
     *
     * @param waveShiftRatio Should be 0 ~ 1. Default to be 0.
     *                       <br/>Result of waveShiftRatio multiples width of WaveView is the length to shift.
     */
    public void setWaveShiftRatio(float waveShiftRatio) {
        if (mWaveShiftRatio != waveShiftRatio) {
            mWaveShiftRatio = waveShiftRatio;
            invalidate();
        }
    }

    public float getWaterLevelRatio() {
        return mWaterLevelRatio;
    }

    /**
     * Set water level according to <code>waterLevelRatio</code>.
     *
     * @param waterLevelRatio Should be 0 ~ 1. Default to be 0.5.
     *                        <br/>Ratio of water level to WaveView height.
     */
    public void setWaterLevelRatio(float waterLevelRatio) {
        if (mWaterLevelRatio != waterLevelRatio) {
            mWaterLevelRatio = waterLevelRatio;
            invalidate();
        }
    }

    public float getAmplitudeRatio() {
        return mAmplitudeRatio;
    }

    /**
     * Set vertical size of wave according to <code>amplitudeRatio</code>
     *
     * @param amplitudeRatio Default to be 0.05. Result of amplitudeRatio + waterLevelRatio should be less than 1.
     *                       <br/>Ratio of amplitude to height of WaveView.
     */
    public void setAmplitudeRatio(float amplitudeRatio) {
        if (mAmplitudeRatio != amplitudeRatio) {
            mAmplitudeRatio = amplitudeRatio;
            invalidate();
        }
    }

    public float getWaveLengthRatio() {
        return mWaveLengthRatio;
    }

    /**
     * Set horizontal size of wave according to <code>waveLengthRatio</code>
     *
     * @param waveLengthRatio Default to be 1.
     *                        <br/>Ratio of wave length to width of WaveView.
     */
    public void setWaveLengthRatio(float waveLengthRatio) {
        mWaveLengthRatio = waveLengthRatio;
    }


    public void setBorder(int width, int color) {
        if (mBorderPaint == null) {
            mBorderPaint = new Paint();
            mBorderPaint.setAntiAlias(true);
            mBorderPaint.setStyle(Style.STROKE);
        }
        mBorderPaint.setColor(color);
        mBorderPaint.setStrokeWidth(width);

        invalidate();
    }

    public void setWaveColor(int behindWaveColor, int frontWaveColor) {
        mBehindWaveColor = behindWaveColor;
        mFrontWaveColor = frontWaveColor;

        // need to recreate shader when color changed
        mWaveShader = null;
        createShader();
        invalidate();
    }

    public void setShapeType(ShapeType shapeType) {
        mShapeType = shapeType;
        invalidate();
    }

    @Override
    protected void onSizeChanged(int w, int h, int oldw, int oldh) {
        super.onSizeChanged(w, h, oldw, oldh);
        createShader();
    }

    /**
     * Create the shader with default waves which repeat horizontally, and clamp vertically
     */
    private void createShader() {
        mDefaultAngularFrequency = 2.0f * Math.PI / DEFAULT_WAVE_LENGTH_RATIO / getWidth();
        mDefaultAmplitude = getHeight() * DEFAULT_AMPLITUDE_RATIO;
        mDefaultWaterLevel = getHeight() * DEFAULT_WATER_LEVEL_RATIO;
        mDefaultWaveLength = getWidth();

        Bitmap bitmap = Bitmap.createBitmap(getWidth(), getHeight(), Bitmap.Config.ARGB_8888);
        Canvas canvas = new Canvas(bitmap);

        Paint wavePaint = new Paint();
        wavePaint.setStrokeWidth(2);
        wavePaint.setAntiAlias(true);

        // Draw default waves into the bitmap
        // y=Asin(ωx+φ)+h
        final int endX = getWidth() + 1;
        final int endY = getHeight() + 1;

        float[] waveY = new float[endX];

        wavePaint.setColor(mBehindWaveColor);
        for (int beginX = 0; beginX < endX; beginX++) {
            double wx = beginX * mDefaultAngularFrequency;
            float beginY = (float) (mDefaultWaterLevel + mDefaultAmplitude * Math.sin(wx));
            canvas.drawLine(beginX, beginY, beginX, endY, wavePaint);

            waveY[beginX] = beginY;
        }

        wavePaint.setColor(mFrontWaveColor);
        final int wave2Shift = (int) (mDefaultWaveLength / 4);
        for (int beginX = 0; beginX < endX; beginX++) {
            canvas.drawLine(beginX, waveY[(beginX + wave2Shift) % endX], beginX, endY, wavePaint);
        }

        // use the bitamp to create the shader
        mWaveShader = new BitmapShader(bitmap, Shader.TileMode.REPEAT, Shader.TileMode.CLAMP);
        mViewPaint.setShader(mWaveShader);
    }

    private  int mBackgroundColor;

    @Override
    public void setBackgroundColor(int color) {
        //mBackgroundColor=color;
        mBackgroundPaint.setColor(color);
        if(mShapeType== ShapeType.CIRCLE){
            invalidate();
            return;
        }
        super.setBackgroundColor(color);
    }

    @Override
    protected void onDraw(Canvas canvas) {
        //----------------------------
        int width = this.getWidth();
        int height = this.getHeight();

        if (width != height) {
            int min = Math.min(width, height);
            width = min;
            height = min;
        }





        // modify paint shader according to mShowWave state
        if ( mWaveShader != null) {
            // first call after mShowWave, assign it to our paint
            if (mViewPaint.getShader() == null) {
                mViewPaint.setShader(mWaveShader);
            }

            // sacle shader according to mWaveLengthRatio and mAmplitudeRatio
            // this decides the size(mWaveLengthRatio for width, mAmplitudeRatio for height) of waves
            mShaderMatrix.setScale(
                mWaveLengthRatio / DEFAULT_WAVE_LENGTH_RATIO,
                mAmplitudeRatio / DEFAULT_AMPLITUDE_RATIO,
                0,
                mDefaultWaterLevel);
            // translate shader according to mWaveShiftRatio and mWaterLevelRatio
            // this decides the start position(mWaveShiftRatio for x, mWaterLevelRatio for y) of waves
            mShaderMatrix.postTranslate(
                mWaveShiftRatio * getWidth(),
                (DEFAULT_WATER_LEVEL_RATIO - mWaterLevelRatio) * getHeight());

            // assign matrix to invalidate the shader
            mWaveShader.setLocalMatrix(mShaderMatrix);

            float borderWidth = mBorderPaint == null ? 0f : mBorderPaint.getStrokeWidth();
            switch (mShapeType) {
                case CIRCLE:
                    if (borderWidth > 0) {
                        canvas.drawCircle(getWidth() / 2f, getHeight() / 2f,
                            (getWidth() - borderWidth) / 2f - 1f, mBorderPaint);
                    }
                    float radius = getWidth() / 2f - borderWidth;
                    canvas.drawCircle(getWidth() / 2f, getHeight() / 2f, radius, mBackgroundPaint);
                    canvas.drawCircle(getWidth() / 2f, getHeight() / 2f, radius, mViewPaint);
                    break;
                case SQUARE:
                    if (borderWidth > 0) {
                        canvas.drawRect(
                            borderWidth / 2f,
                            borderWidth / 2f,
                            getWidth() - borderWidth / 2f - 0.5f,
                            getHeight() - borderWidth / 2f - 0.5f,
                            mBorderPaint);
                    }
                    canvas.drawRect(borderWidth, borderWidth, getWidth() - borderWidth,
                        getHeight() - borderWidth, mViewPaint);
                    break;
            }
        } else {
            mViewPaint.setShader(null);
        }



        // 设置画笔相关属性
        cPaint.setAntiAlias(true);
        cPaint.setColor(Color.rgb(0xe9, 0xe9, 0xe9));
        canvas.drawColor(Color.TRANSPARENT);
        cPaint.setStrokeWidth(mCircleLineStrokeWidth);
        cPaint.setStyle(Style.STROKE);
        // 位置
        mRectF.left = mCircleLineStrokeWidth / 2; // 左上角x
        mRectF.top = mCircleLineStrokeWidth / 2; // 左上角y
        mRectF.right = width - mCircleLineStrokeWidth / 2; // 左下角x
        mRectF.bottom = height - mCircleLineStrokeWidth / 2; // 右下角y

        // 绘制圆圈，进度条背景
        canvas.drawArc(mRectF, -90, 360, false, cPaint);
        if (mProgress>75){
            cPaint.setColor(getResources().getColor(R.color.circle_progress_all));
        }else if (mProgress<=75&&mProgress>50){
            cPaint.setColor(getResources().getColor(R.color.circle_progress_seven));
        }else{
            cPaint.setColor(getResources().getColor(R.color.circle_progress_five));
        }

        canvas.drawArc(mRectF, -90, ((float) mProgress / mMaxProgress) * 360, false, cPaint);

        // 绘制进度文案显示
        cPaint.setStrokeWidth(mTxtStrokeWidth);
        if (mProgress>=100){
            mProgress=100;
        }
        String text = mProgress + "%";
        int textHeight = height / 10;
        cPaint.setTextSize(textHeight);
        int textWidth = (int) cPaint.measureText(text, 0, text.length());
        cPaint.setStyle(Style.FILL);
        canvas.drawText(text, width / 2 - textWidth / 2, 4 * height / 10 + textHeight / 2, cPaint);

        //绘制文字“已使用”
        if (!TextUtils.isEmpty(mTxtHint1)) {
            cPaint.setStrokeWidth(mTxtStrokeWidth);
            text = mTxtHint1;
            textHeight = height / 15;
            cPaint.setTextSize(textHeight);
//            mPaint.setColor(Color.rgb(0x1a, 0xad, 0x10a));
            cPaint.setColor(getResources().getColor(R.color.circle_progress_txt));
            textWidth = (int) cPaint.measureText(text, 0, text.length());
            cPaint.setStyle(Style.FILL);
            canvas.drawText(text, width / 2 - textWidth / 2, 2 * height / 10 + textHeight / 2, cPaint);
        }
        //文字：去购买套餐
        if (mProgress>=100) {
            cPaint.setStrokeWidth(mTxtStrokeWidth);
            text = txt_getFlow;
            textHeight = height / 15;
            cPaint.setTextSize(textHeight);
            cPaint.setColor(getResources().getColor(R.color.circle_progress_five));
            textWidth = (int) cPaint.measureText(text, 0, text.length());
            cPaint.setStyle(Style.FILL);
            canvas.drawText(text, width / 2 - textWidth / 2, 5 * height / 10 + textHeight / 2+ textHeight / 2, cPaint);
            canvas.drawLine(width / 2 - textWidth / 2,5 * height / 10 + textHeight / 2+ textHeight / 2,width / 2 + textWidth / 2,5 * height / 10 + textHeight / 2+ textHeight / 2,cPaint);
        }
        //文字“总流量”
        if (!TextUtils.isEmpty(mTxtHint2)) {
            cPaint.setStrokeWidth(mTxtStrokeWidth);
            text = mTxtHint2;
            textHeight = height / 15;
            cPaint.setTextSize(textHeight);
            cPaint.setColor(getResources().getColor(R.color.circle_progress_txt));
            textWidth = (int) cPaint.measureText(text, 0, text.length());
            cPaint.setStyle(Style.FILL);
            canvas.drawText(text, width / 2 - textWidth / 2, 7 * height / 10 + textHeight / 2, cPaint);
        }
        //文字：剩余流量
        if (!TextUtils.isEmpty(txt_total)) {
            cPaint.setStrokeWidth(mTxtStrokeWidth);
            text = txt_total;
            textHeight = height / 17;
            cPaint.setTextSize(textHeight);
            cPaint.setColor(getResources().getColor(R.color.circle_progress_five));
            textWidth = (int) cPaint.measureText(text, 0, text.length());
            cPaint.setStyle(Style.FILL);
            canvas.drawText(text, width / 2 - textWidth / 2, 8 * height / 10 + textHeight / 2, cPaint);
        }


    }

    private void initAnimation() {
        List<Animator> animators = new ArrayList<>();

        // horizontal animation.
        // wave waves infinitely.
        ObjectAnimator waveShiftAnim = ObjectAnimator.ofFloat(
                this, "waveShiftRatio", 0f, 1f);
        waveShiftAnim.setRepeatCount(ValueAnimator.INFINITE);
        waveShiftAnim.setDuration(mSpeed);
        waveShiftAnim.setInterpolator(new LinearInterpolator());
        animators.add(waveShiftAnim);

        ObjectAnimator amplitudeAnim = ObjectAnimator.ofFloat(
                this, "amplitudeRatio", 0.03f, 0.05f);
        amplitudeAnim.setRepeatCount(ValueAnimator.INFINITE);
        amplitudeAnim.setRepeatMode(ValueAnimator.REVERSE);
        amplitudeAnim.setDuration(5000);
        amplitudeAnim.setInterpolator(new LinearInterpolator());
        animators.add(amplitudeAnim);

        mAnimatorSet = new AnimatorSet();
        mAnimatorSet.playTogether(animators);
    }

    private  int mMax=100;
    private int mProgress;
    private int mSpeed=5000;

    public void setWaveSpeed(int time){
      mAnimatorSet.getChildAnimations().get(0).setDuration(time);
    }
    public void setProgressMax(int max){
        mMax=max;
    }

    public void setProgress(int progress){
        mProgress=progress;
        setWaterLevelRatio((float)(100-progress)/mMax);
    }

    public int getProgress(){
        return mProgress;
    }

    public void start() {
        if (mAnimatorSet != null) {
            mAnimatorSet.start();
        }
    }

    public void cancel() {
        if (mAnimatorSet != null) {
            mAnimatorSet.cancel();
            mAnimatorSet.end();
        }
    }
    @Override
    protected void onAttachedToWindow() {
        super.onAttachedToWindow();
        start();

    }

    @Override
    protected void onDetachedFromWindow() {
        super.onDetachedFromWindow();
        cancel();
    }

    public String getmTxtHint1() {
        return mTxtHint1;
    }

    public void setmTxtHint1(String mTxtHint1) {
        this.mTxtHint1 = mTxtHint1;
    }

    public String getmTxtHint2() {
        return mTxtHint2;
    }
    public void setmTxtHint2(String mTxtHint2) {
        this.mTxtHint2 = mTxtHint2;
    }
    //设置总的流量数
    public void setTxt_total(String txt_total) {
        this.txt_total = txt_total;
    }
    //设置圆线的颜色
    public void setCircleColor(int color){
        circleColor = color;
    }

}
