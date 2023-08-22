(function(){
    
const player = document.getElementById('video-player');
const playerContainer = $('.player');
const volumeButton = $('.player__volume-button');

volumeButton.css({
    left: `${player.volume * 100}%`
})

function volumeChangeIndicator(muted) {

    if (!muted) {
        $('.player__volume-indicator').css({
            width: `${player.volume * 100}%`
        })
    } else {
        $('.player__volume-indicator').css({
            width: `${0}%`
        })
    }
}

function playVideo() {
    if (player.paused) {
        playerContainer.addClass('paused');
        playerContainer.removeClass('active');
        player.play();
    } else {
        playerContainer.addClass('active');
        playerContainer.removeClass('paused');
        player.pause();
    }
};


$('.player__start').on('click', function (e) {
    e.preventDefault();
    playVideo();
});
$('.player__splash').on('click', function (e) {
    e.preventDefault();
    playVideo();
})
$('.player__playback').on('click', function (e) {
    e.preventDefault();

    const bar = $(e.currentTarget);
    const clickedPos = e.originalEvent.layerX;
    const newBtnPos = (clickedPos / bar.width()) * 100;
    const newPlaybackPos = (player.duration / 100) * newBtnPos;

    player.currentTime = newPlaybackPos;
})

function onPlayerReady() {
    let interval;
    if (typeof interval != "undefined") {
        clearInterval(interval);
    }
    const durationSec = player.duration;
    interval = setInterval(() => {
        const completedSec = player.currentTime;
        const completedPercent = (completedSec / durationSec) * 100;
        $('.player__playback-button').css({
            left: `${completedPercent}%`
        })
        $('.player__playback-indicator').css({
            width: `${completedPercent}%`
        })
        if (player.ended) {
            playerContainer.addClass('active');
            playerContainer.removeClass('paused');
            player.pause();
        }
        volumeChangeIndicator(player.muted)
    })

}
$('.player__volume-button--off').on('click', function (e) {
    e.preventDefault();

    const muteBtn = $(e.currentTarget);
    muteBtn.toggleClass('active')
    if (muteBtn.hasClass('active')) {
        player.muted = true;
        volumeButton.css({
            left: `0%`
        })
    } else {
        player.muted = false;
        volumeButton.css({
            left: `${player.volume * 100}%`
        })

    }
});

$('.player__volume').on('click', function (e) {
    e.preventDefault();

    const volBar = $(e.currentTarget);
    const clickedVolBarPos = e.originalEvent.layerX;
    const clickedVolBarPosMs = clickedVolBarPos / 100


    volumeButton.css({
        left: `${clickedVolBarPos}%`
    })
    player.volume = clickedVolBarPosMs;

});
onPlayerReady();
})()