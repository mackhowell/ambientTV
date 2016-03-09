// Formstone Wallpaper - Video Background Settings

function randomFrom(array) {
   return array[Math.floor(Math.random() * array.length)];
 };

   $("header.video").wallpaper({
       source: {
    video: randomFrom(['https://www.youtube.com/watch?v=n30xCZESVOQ','https://www.youtube.com/watch?v=UsJA77tCzKY','https://www.youtube.com/watch?v=BDFSj_MIPis','https://www.youtube.com/watch?v=MxrI-QKuGsI','https://www.youtube.com/watch?v=FF2bhR7s3VY&feature=youtu.be','https://www.youtube.com/watch?v=qREKP9oijWI','https://www.youtube.com/watch?v=u93LKIwiCn8', 'https://www.youtube.com/watch?v=C6yVfvhYLPE', 'https://www.youtube.com/watch?v=_ziUhNerFMI','https://www.youtube.com/watch?v=EDir9-UoPjo','https://www.youtube.com/watch?v=OtkUqDo5Wzs','https://www.youtube.com/watch?v=LPaLN_1iOZ8','https://www.youtube.com/watch?v=k1TdTV3bHA8']),
           poster: "assets/img/bg-mobile-fallback.jpg"
           /*mp4: "assets/mp4/camera.mp4"*/
       },
   youtubeOptions: {
     start: 830
   }
   });
