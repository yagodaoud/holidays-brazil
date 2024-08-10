const fixedHolidays = [
    { day: 1, month: 1, name: "Confraternização Universal" },
    { day: 21, month: 4, name: "Tiradentes" },
    { day: 1, month: 5, name: "Dia do Trabalhador" },
    { day: 7, month: 9, name: "Independência do Brasil" },
    { day: 12, month: 10, name: "Nossa Senhora Aparecida" },
    { day: 2, month: 11, name: "Finados" },
    { day: 15, month: 11, name: "Proclamação da República" },
    { day: 20, month: 11, name: "Consciência Negra" },
    { day: 25, month: 12, name: "Natal" }
];

const movingHolidays = [
    { name: "Carnaval", daysOffset: -47 },
    { name: "Sexta-feira Santa", daysOffset: -2 },
    { name: "Páscoa", daysOffset: 0 },
    { name: "Corpus Christi", daysOffset: 60 }
];

function isHoliday(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;

    const isFixedHoliday = fixedHolidays.some(holiday => holiday.day === day && holiday.month === month);
    if (isFixedHoliday) {
        return true;
    }

    const easterDate = calculateEaster(date.getFullYear());
    const isMovingHoliday = movingHolidays.some(holiday => {
        const holidayDate = new Date(easterDate);
        holidayDate.setDate(easterDate.getDate() + holiday.daysOffset);

        return holidayDate.getDate() === day && (holidayDate.getMonth() + 1) === month;
    });

    return isMovingHoliday;
}

function calculateEaster(year) {
    //Calculado com base em https://www.irt.org/articles/js052/index.htm
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31);
    const day = ((h + l - 7 * m + 114) % 31) + 1;

    return new Date(year, month - 1, day);
}

module.exports = isHoliday