

const today = new Date();
let year = today.getFullYear();
let month = today.getMonth();


const calendarBody = document.getElementById('calendarBody');
const CURRENTMonth = document.getElementById('CURRENTMonth');
function renderCalender (year ,month) {
// １日の曜日を取得
const firstDay = new Date(year, month, 1).getDay();
// 月の日数を取得
const monthDate = new Date(year, month + 1,0).getDate();



  CURRENTMonth.textContent = month + 1;

  for (let i = 0; i < 42; i++ ) {
    const p = document.createElement('p');
    if (i < firstDay) {
      p.textContent = "";
      calendarBody.appendChild(p);
    } else if (i < firstDay + monthDate) {
      const date = i - firstDay+1;
      p.textContent = date;

      p.addEventListener('click',()=> {
          const sideNav = document.getElementById('sideNav');
          sideNav.classList.toggle('is-active');
          const selectedDate = document.getElementById('selectedDate');
          selectedDate.textContent = `${year}年 ${month+1}月 ${date}日`;
          const closeBtn = document.getElementById('closeBtn');
          closeBtn.addEventListener('click',()=> {
            sideNav.classList.remove('is-active');
          });
      });

     
      if (
        year === today.getFullYear() &&
        month === today.getDay()-1 &&
        date === today.getDate()
      ) {
        p.className = 'current';
      }
     calendarBody.appendChild(p);
    }
  }
}
renderCalender(year, month);

const prev = document.querySelector('#prev');
const next = document.querySelector('#next');


prev.addEventListener('click',()=> {
  calendarBody.innerHTML = "";
  month--;
  if(month < 0) {
    month = 11;
    year--;
  }
  renderCalender(year, month);
});
next.addEventListener('click',()=> {
  calendarBody.innerHTML = "";
  month++;
  if(month < 0) {
    month = 11;
    year++;
  }
  renderCalender(year, month);
});

function replaceSliderImage (imgSrc) {
  const track = document.querySelector('.slider-track');
  track.innerHTML = "";

  const img = document.createElement('img');
  img.src = imgSrc;
  track.appendChild(img);
}

// uploadした画像を表示
  const imgUpload = document.getElementById('imgUpload');
  imgUpload.addEventListener('change',(e)=> {
      const file = e.target.files[0];
    if(!file) return;

    const render = new FileReader();

    render.onload = () => {
      const imgSrc = render.result;
      replaceSliderImage(imgSrc);
    }
    render.readAsDataURL(file);
  });

