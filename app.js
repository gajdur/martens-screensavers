"use strict";

function init() {
};

var Animation = Homey.manager('ledring').Animation;

//-------------------White Sleep Animation Start ---------------------------------------------------
var frames_white_sleep = [];
var frame_white_sleep = [];

// for every pixel...
for( var pixel = 0; pixel < 24; pixel++ ) {
	if( pixel < 1) {
		frame_white_sleep.push({
			r: 255,	g: 255,	b: 255
		});
	} else {
		frame_white_sleep.push({
			r: 0, g: 0, b: 0
		})
	}
}
frames_white_sleep.push(frame_white_sleep);

var animation_white_sleep = new Animation({
	
    options: {
        fps     : 1, 	// real frames per second
        tfps    : 60, 	// target frames per second. this means that every frame will be interpolated 60 times
        rpm     : 16,	// rotations per minute
    },
    frames    : frames_white_sleep
})

animation_white_sleep.register(function(err, result){
	Homey.manager('ledring').registerScreensaver('white_sleep', animation_white_sleep)
	if( err ) return Homey.error(err);
	animation_white_sleep.on('screensaver_start', function( screensaver_id ){
		Homey.log('Screensaver started')
	})
	animation_white_sleep.on('screensaver_stop', function( screensaver_id ){
		Homey.log('Screensaver stopped')
	})
})
//-------------------White Sleep Animation Stop ---------------------------------------------------
//-------------------White Slow Sleep Animation Start ---------------------------------------------------
var frames_white_slow_sleep = [];
var frame_white_slow_sleep = [];

// for every pixel...
for( var pixel = 0; pixel < 24; pixel++ ) {
	if( pixel < 1) {
		frame_white_slow_sleep.push({
			r: 255,	g: 255,	b: 255
		});
	} else {
		frame_white_slow_sleep.push({
			r: 0, g: 0, b: 0
		})
	}
}
frames_white_slow_sleep.push(frame_white_slow_sleep);

var animation_white_slow_sleep = new Animation({
	
    options: {
        fps     : 1, 	// real frames per second
        tfps    : 60, 	// target frames per second. this means that every frame will be interpolated 60 times
        rpm     : 1,	// rotations per minute
    },
    frames    : frames_white_slow_sleep
})

animation_white_slow_sleep.register(function(err, result){
	Homey.manager('ledring').registerScreensaver('white_slow_sleep', animation_white_slow_sleep)
	if( err ) return Homey.error(err);
	animation_white_sleep.on('screensaver_start', function( screensaver_id ){
		Homey.log('Screensaver started')
	})
	animation_white_sleep.on('screensaver_stop', function( screensaver_id ){
		Homey.log('Screensaver stopped')
	})
})
//-------------------White Slow Sleep Animation Stop ---------------------------------------------------
//-------------------TIFF Animation Start ---------------------------------------------------
var frames_TIFF = [];
var frame_TIFF = [];

// for every pixel...
for( var pixel = 0; pixel < 24; pixel++ ) {
	if( pixel == 8) {
		frame_TIFF.push({
			r: 255,	g: 0,	b: 0
		});
	} else if( pixel < 8 ) {
		if ( pixel > 4 ) {
			frame_TIFF.push({
				r: 255/4*(pixel-4),	g: 0,	b: 0
			});
		}
		else {
			frame_TIFF.push({
				r: 0, g: 0, b: 0
			});
		}
	} else if( pixel > 8 ) {
		if ( pixel < 12) {
			frame_TIFF.push({
				r: 255/4*(12-pixel), g: 0,	b: 0
			});
		}
		else {
			frame_TIFF.push({
				r: 0, g: 0, b: 0
			});
		}
	} else {
		frame_TIFF.push({
			r: 0, g: 0, b: 0
		})
	}
}
frames_TIFF.push(frame_TIFF);

var animation_TIFF = new Animation({
	
    options: {
        fps     : 1, 	// real frames per second
        tfps    : 60, 	// target frames per second. this means that every frame will be interpolated 60 times
        rpm     : 20,	// rotations per minute
    },
    frames    : frames_TIFF
})

animation_TIFF.register(function(err, result){
	Homey.manager('ledring').registerScreensaver('TIFF', animation_TIFF)
	if( err ) return Homey.error(err);
	animation_white_sleep.on('screensaver_start', function( screensaver_id ){
		Homey.log('Screensaver started')
	})
	animation_white_sleep.on('screensaver_stop', function( screensaver_id ){
		Homey.log('Screensaver stopped')
	})
})
//-------------------TIFF Animation Stop ---------------------------------------------------
//-------------------Faint Rainbow Start ---------------------------------------------------
var frames_faint_rainbow = [];
var frame_faint_rainbow = [];

// for every pixel...
for( var pixel = 0; pixel < 24; pixel++ ) {

    var hue = (pixel/(24)) * 360;
    var color = hsvToRgbLow( hue, 100, 100 )

    frame_faint_rainbow.push({
        r: color[0], // 0 - 255
        g: color[1], // 0 - 255
        b: color[2]  // 0 - 255
    });
}

function hsvToRgbLow(h, s, v) {
    var r, g, b;
    var i;
    var f, p, q, t;

    // Make sure our arguments stay in-range
    h = Math.max(0, Math.min(360, h));
    s = Math.max(0, Math.min(100, s));
    v = Math.max(0, Math.min(100, v));

    // We accept saturation and value arguments from 0 to 100 because that's
    // how Photoshop represents those values. Internally, however, the
    // saturation and value are calculated from a range of 0 to 1. We make
    // That conversion here.
    s /= 100;
    v /= 100;

    if(s == 0) {
        // Achromatic (grey)
        r = g = b = v;
        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }

    h /= 60; // sector 0 to 5
    i = Math.floor(h);
    f = h - i; // factorial part of h
    p = v * (1 - s);
    q = v * (1 - s * f);
    t = v * (1 - s * (1 - f));

    switch(i) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;

        case 1:
            r = q;
            g = v;
            b = p;
            break;

        case 2:
            r = p;
            g = v;
            b = t;
            break;

        case 3:
            r = p;
            g = q;
            b = v;
            break;

        case 4:
            r = t;
            g = p;
            b = v;
            break;

        default: // case 5:
            r = v;
            g = p;
            b = q;
    }

    return [Math.round(r * 25), Math.round(g * 25), Math.round(b * 25)];
}

frames_faint_rainbow.push(frame_faint_rainbow);

var animation_faint_rainbow = new Animation({
	
    options: {
        fps     : 1, 	// real frames per second
        tfps    : 60, 	// target frames per second. this means that every frame will be interpolated 60 times
        rpm     : 12,	// rotations per minute
    },
    frames    : frames_faint_rainbow
})

animation_faint_rainbow.register(function(err, result){
	Homey.manager('ledring').registerScreensaver('faint_rainbow', animation_faint_rainbow)
	if( err ) return Homey.error(err);
	animation_white_sleep.on('screensaver_start', function( screensaver_id ){
		Homey.log('Screensaver started')
	})
	animation_white_sleep.on('screensaver_stop', function( screensaver_id ){
		Homey.log('Screensaver stopped')
	})
})
//-------------------Faint Rainbow Animation Stop ---------------------------------------------------