const loadLessons = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')

    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};

const removeActive = () => {
    const lessonButtons = document.querySelectorAll('.lesson-btn');

    lessonButtons.forEach((btn) => 
        btn.classList.remove('active'));
}

const loadLevelWord = (id) => {

    const url = `https://openapi.programming-hero.com/api/level/${id}`;

    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        removeActive();
        const clickBtn = document.getElementById(`lesson-btn-${id}`);
        clickBtn.classList.add('active');
        displayLevelWord(data.data)
    });
}

const displayLevelWord = (words) => {
    //console.log(words);
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = "";   

    if(words.length === 0){
       wordContainer.innerHTML = `<div class="text-center col-span-full font-bangla rounded-xl py-10 space-y-6">

    <img src="./assets/alert-error.png" class=" mx-auto" alt="">

    <p class="text-xl font-medium text-grey-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি </p>
    <h2 class="font-bold text-4xl">নেক্সট  Lesson এ যান।</h2>
  </div>`;  
        return;
    }

    words.forEach((word) => {
        console.log(word);
        const card = document.createElement('div');
        card.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm py-10 px-5 text-center space-y-4">
        <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
        <p class="font-semibold ">Meaning / pronunciation</p>
        <div class="font-bangla text-2xl font-semibold">"${word.meaning ? word.meaning : " অর্থ পাওয়া যায়নি"}/ ${word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায়নি"}" </div>
        <div class="flex justify-between items-center">
      <button onclick="my_modal_5.showModal()" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
      <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
    </div>
  </div>
        `;
        wordContainer.append(card);
    });
};

const displayLesson = (lessons) => {
    //console.log(lessons);
//1. get the container and empty it
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = "";
//2.Get into every lesson(loop through the array)
    for(let lesson of lessons){
//3.Create element

        const btnDiv = document.createElement("div");
         btnDiv.innerHTML = `
                 <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
                 <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
                  </button>
    `;
//4.Append child

        levelContainer.append(btnDiv);

    } 
};
loadLessons();   