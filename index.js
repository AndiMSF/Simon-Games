

var buttonColours = ["red","blue","green","yellow"];
// alur random generate untuk game nya
var gamePattern = [];

// untuk menyimpan jawaban / pilihan kita
var userClickedPattern = [];

// level awal
var level = 0;
// untuk sebagai bendera jika orang press key game nya akan mulai atau tidak
// kalau false dia blm mulai 
// kalau true dia sudah mulai 
var started = false;

// jika user sudah keypress maka function dibawah akan dijalankan
$(document).keypress(function()
{
    if(!started)
    {
      
        // kita mengubah big-title "press any key to start " menjadi Level. 
        $("#big-title").text("Level "+level);

        // kita panggil function nextSequence
        // yang isinya cara bermain nya
        
        nextSequence();
        // ini gamenya masih true, kalau sudah balik ke atas dia akan jadi false lagi.

        started = true;
       
    }
});

$(".btn").on("click",function()
{
    // jadi setiap kita klik , misal klik merah, itu disimpan ke (this) dan kita ambil id dari yang kita klik
    // yaitu si merah, trs kita cari ke html nya , disaat kita nemu id nya, kita akan simpan id tsb ke userClickedPattern !!
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkJawaban(userClickedPattern.length-1)

});

function checkJawaban(levelSekarang)
{
    if(gamePattern[levelSekarang]=== userClickedPattern[levelSekarang])
    {
        console.log("Success");
        if(userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function()
            {
                nextSequence();
            },1000);
        }
    }
    else {
        console.log("Wrong");
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("#big-title").text("GAGAL !, PENCET KEY APA SAJA UNTUK MEMULAI KEMBALI PERMAINANNYA");
        
        memulaiKembali();

    }
}




function nextSequence()
{   

    userClickedPattern = [];

    level++;

    $("#big-title").text("Level "+level);

    //membuat random nomor untuk mengambil value / nilai dari array buttonColours.
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    

}

function playSound(name){
    // menambahkan suara ketika di klik
    var audio = new Audio("sounds/"+name+".mp3");
        audio.play();

 
}


function animatePress(currentColour)
{
    
    // menambahkan animasi ketika di klik
    $("#"+currentColour).addClass("pressed");
    
    // untuk remove class pressed / animasi setelah 100 miliseconds
    setTimeout(function()
    {
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function memulaiKembali()
{   
   
    level = 0;
    gamePattern = [];
    started = false;
}