import dayjs from 'dayjs';

const form = document.getElementById('birthdayForm');
const bdayInput = document.getElementById('bdayInput');
const dialog = document.getElementById('resultDialog');
const closeBtn = document.getElementById('closeBtn');
const dialogContent = document.getElementById('dialogContent');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const birthDate = dayjs(bdayInput.value);
    const today = dayjs().startOf('day');

    const daysLived = today.diff(birthDate, 'days');

    let nextBirthday = birthDate.year(today.year());
    if (today.isAfter(nextBirthday)) {
        nextBirthday = nextBirthday.add(1, 'year');
    }

    const isToday = today.format('MM-DD') === birthDate.format('MM-DD');

    const weeksLeft = nextBirthday.diff(today, 'weeks');

    let message = `<p class="mb-4">Od Twojej daty urodzenia minęło: <strong>${daysLived} dni</strong>.</p>`;


    if (isToday) {
        // Jeśli urodziny są dzisiaj
        message += `<p class="font-bold text-lg text-green-600">Wszystkiego najlepszego!</p>`;
    } else if (weeksLeft === 0) {
        // Jeśli nie dzisiaj, ale w tym tygodniu (0 tygodni) - wyświetla TYLKO ten tekst
        message += `<p class="font-bold mt-2">Masz urodziny w tym tygodniu!</p>`;
    } else {
        // We wszystkich innych wypadkach wyświetla normalną liczbę tygodni
        message += `<p>Do najbliższych urodzin pozostało tygodni: <strong>${weeksLeft}</strong>.</p>`;
    }

    dialogContent.innerHTML = message;
    dialog.showModal();
});

closeBtn.addEventListener('click', () => {
    dialog.close();
});
