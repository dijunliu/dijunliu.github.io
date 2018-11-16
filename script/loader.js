var loader = {
    totalCount : 0,
    loadedCount : 0,
    loaded : true,
    soundFileExtn:'mp3',
    init:function(){
        var audio = new Audio();
        if(audio.canPlayType){
            loader.soundFileExtn = audio.canPlayType('audio/mpeg')?'.mp3':
                audio.canPlayType('audio/ogg')?'.ogg':undefined;
        }
    },
    loadImg:function (url) {
        loader.totalCount++;
        loader.loaded = false;
        $('#loadingscreen').show();
        var img =new Image();
        img.src = url;
        img.onload = loader.itemLoaded;
        return img;
    },
    loadSound:function (url) {
        loader.totalCount++;
        loader.loaded = false;
        $('#loadingscreen').show();
        var audio =new Audio();
        audio.src = url;
        audio.addEventListener("canplaythrough",loader.itemLoaded,false);
        return audio;
    },
    itemLoaded:function () {
        loader.loadedCount++;
        $('#loadingmessage').html('loaded: '+loader.loadedCount+' of '+loader.totalCount)
        if (loader.totalCount == loader.loadedCount){
            loader.loaded = true;
            $('#loadingscreen').hide();
        }
        if (loader.onload){
            loader.onload();
        }
    }
}