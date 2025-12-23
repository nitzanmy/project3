

let currentWeekOffset = 0;

// Define class limits based on membership type stored during registration
const membershipType = localStorage.getItem('userMembershipType');
let weeklyClassLimit = Infinity;

// Set weekly class limit based on membership type
// Limit applies only to studio memberships, not to Zoom memberships
if (membershipType === 'gym_1perweek') {
    weeklyClassLimit = 1;
} else if (membershipType === 'gym_2perweek') {
    weeklyClassLimit = 2;
}

// Helper flags for membership category
const isZoomMembership = membershipType === 'zoom_1perweek' || membershipType === 'zoom_2perweek';
const isGymMembership = membershipType === 'gym_1perweek' || membershipType === 'gym_2perweek';


// Data Definition

const notices = [
    // notices
    "בודק יקר: ממליצות להסתכל על תאריכים ה 21-27.12",
    "בודק : כדאי להירשם בעמוד ההרשמה גם למנוי זום וגם למנוי של שיעורים כדי לראות שינוי באפשרויות הרשמה",
    "יש גם אימונים בדוגמאות עד ה 10.01"
];

const classes = [

    // Week 1
    {
        id: 1,
        date: '2025-12-21',
        time: '08:00 - 09:00',
        name: 'פילאטיס מזרן קלאסי',
        registered: 8,
        max: 12
    },
    {
        id: 2,
        date: '2025-12-21',
        time: '19:00 - 20:00',
        name: 'פילאטיס עם כדור גדול',
        registered: 12,
        max: 12
    },

    {
        id: 3,
        date: '2025-12-22',
        time: '09:00 - 10:00',
        name: 'פילאטיס עם כדור קטן',
        registered: 4,
        max: 6,
        zoomLink: 'https://zoom.us/j/123456'
    },
    {
        id: 4,
        date: '2025-12-22',
        time: '18:00 - 19:00',
        name: 'פילאטיס עם גליל',
        registered: 10,
        max: 15
    },

    {
        id: 5,
        date: '2025-12-23',
        time: '07:30 - 08:30',
        name: 'פילאטיס עם משקולות',
        registered: 6,
        max: 10,
        zoomLink: 'https://zoom.us/j/123456'
    },
    {
        id: 6,
        date: '2025-12-23',
        time: '20:00 - 21:00',
        name: 'פילאטיס עם פיתה',
        registered: 5,
        max: 10
    },

    {
        id: 7,
        date: '2025-12-24',
        time: '18:00 - 19:00',
        name: 'פילאטיס מזרן קלאסי',
        registered: 12,
        max: 15
    },

    {
        id: 8,
        date: '2025-12-25',
        time: '08:30 - 09:30',
        name: 'פילאטיס עם משקולות',
        registered: 10,
        max: 10,
        zoomLink: 'https://zoom.us/j/123456'
    },

    {
        id: 9,
        date: '2025-12-26',
        time: '08:00 - 09:00',
        name: 'תנועה ומתיחות',
        registered: 9,
        max: 15
    },

    // Week 2 
    {
        id: 10,
        date: '2025-12-28',
        time: '18:00 - 19:00',
        name: 'פילאטיס מזרן קלאסי',
        registered: 15,
        max: 15
    },

    {
        id: 11,
        date: '2025-12-29',
        time: '08:30 - 09:30',
        name: 'פילאטיס עם משקולות',
        registered: 8,
        max: 10,
        zoomLink: 'https://zoom.us/j/123456'
    },

    {
        id: 12,
        date: '2025-12-30',
        time: '08:00 - 09:00',
        name: 'תנועה ומתיחות',
        registered: 11,
        max: 15
    },

    // Week 3
    {
        id: 13,
        date: '2026-01-05',
        time: '18:00 - 19:00',
        name: 'פילאטיס עם גליל',
        registered: 10,
        max: 15
    },

    {
        id: 14,
        date: '2026-01-06',
        time: '07:30 - 08:30',
        name: 'פילאטיס עם משקולות',
        registered: 6,
        max: 10,
        zoomLink: 'https://zoom.us/j/123456'
    },

    {
        id: 15,
        date: '2026-01-08',
        time: '20:00 - 21:00',
        name: 'פילאטיס עם פיתה',
        registered: 10,
        max: 10
    },
];


// Calculates and displays the dates for the current week view
// Updates the DOM elements with the correct date strings and data attributes
function setWeeklyDates() {
    const today = new Date();
    const currentViewDate = new Date();
    currentViewDate.setDate(today.getDate() + (currentWeekOffset * 7));

    const currentDayOfWeek = currentViewDate.getDay();

    const startOfWeek = new Date(currentViewDate);
    startOfWeek.setDate(currentViewDate.getDate() - currentDayOfWeek);

    for (let i = 0; i < 7; i++) {
        let loopDate = new Date(startOfWeek);
        loopDate.setDate(startOfWeek.getDate() + i);

        let dateStringDisplay = loopDate.toLocaleDateString('he-IL', { day: 'numeric', month: 'numeric' });
        let element = document.getElementById(`date-${i}`);
        if (element) {
            element.textContent = dateStringDisplay;
        }

        const year = loopDate.getFullYear();
        const month = String(loopDate.getMonth() + 1).padStart(2, '0');
        const day = String(loopDate.getDate() + 0).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        const dayContent = document.getElementById(`day-content-${i}`);
        if (dayContent) {
            dayContent.setAttribute('data-date', formattedDate);
        }
    }
}

// Handles navigation between weeks (Next/Previous)
function changeWeek(direction) {
    currentWeekOffset += direction;
    setWeeklyDates();
    renderSchedule();
}

// Main function to generate the schedule 
function renderSchedule() {
    const noticesContainer = document.getElementById('notices-container');
    if (noticesContainer) {
        noticesContainer.innerHTML = '';
        notices.forEach(noticeText => {
            const noticeDiv = document.createElement('div');
            noticeDiv.className = 'notice-item';
            noticeDiv.textContent = noticeText;
            noticesContainer.appendChild(noticeDiv);
        });
    }

    const myGymRegistrations = JSON.parse(localStorage.getItem('myClassesGym') || '[]');
    // Clear existing class entries
    for (let i = 0; i <= 6; i++) {
        const dayContent = document.getElementById(`day-content-${i}`);
        if (dayContent) {
            dayContent.innerHTML = '';
            if (i === 6) {
                dayContent.innerHTML = '<p style="text-align:center; color:#999; margin-top:20px;">מנוחה</p>';
            }
        }
    }

    // Populate classes for each day of the week
    for (let i = 0; i <= 6; i++) {
        const dayContainer = document.getElementById(`day-content-${i}`);
        if (!dayContainer) continue;

        const columnDate = dayContainer.getAttribute('data-date');

        const relevantClasses = classes.filter(c => c.date === columnDate);
        relevantClasses.sort((a, b) => a.time.localeCompare(b.time));

        relevantClasses.forEach(classItem => {
            const isZoomClass = !!classItem.zoomLink;

            const myRegistrations = myGymRegistrations; // Consolidated registration check
            const isRegistered = myRegistrations.includes(classItem.id);

            let currentRegistered = classItem.registered;
            // Adjust count if user is registered and class is not Zoom
            if (!isZoomClass && isRegistered) {
                currentRegistered += 1;
            }

            let btnText = 'הרשמה לשיעור';
            let btnClass = 'register-btn';
            let btnAction = `registerForClass(${classItem.id}, '${classItem.name}')`;

            // "Registered" button logic for any class the user is signed up for
            if (isRegistered) {
                btnText = 'רשום ✓ (לחץ לביטול)';
                btnClass = 'register-btn registered';
                btnAction = `cancelRegistration(${classItem.id})`;

            } else if (!isZoomClass && currentRegistered >= classItem.max) {
                // Waitlist logic applies only to studio classes
                btnText = 'רשימת המתנה (מלא)';
                btnClass = 'register-btn-waitlist';
                btnAction = "alert('נרשמת לרשימת המתנה!')";
            }

            let zoomHtml = '';
            if (classItem.zoomLink && isZoomMembership) {
                zoomHtml = `
                <a href="${classItem.zoomLink}" target="_blank" style="text-decoration:none;">
                    <span class="zoom-tag">ZOOM</span>
                </a>`;
            }

            // Create class card element
            const classCard = document.createElement('div');
            classCard.className = 'class-card';

            classCard.innerHTML = `
                <div class="class-time">${classItem.time}</div>
                <div class="class-name">${classItem.name}</div>
                <div class="class-details">
                    <span><i class="fas fa-users"></i> ${currentRegistered}/${classItem.max}</span>
                    ${zoomHtml}
                </div>
                <button class="${btnClass}" onclick="${btnAction}">${btnText}</button>
            `;

            dayContainer.appendChild(classCard);
        });
    }
}

// Registration Functions

// Handles user class registration: validates login, membership limits, and capacity
function registerForClass(classId, className) {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
        if (confirm('עליך להתחבר כדי להירשם. לעבור להתחברות?')) {
            window.location.href = 'login.html';
        }
        return;
    }

    const membershipType = localStorage.getItem('userMembershipType');

    const classItem = classes.find(c => c.id === classId);
    if (!classItem) {
        alert('שגיאה: השיעור לא נמצא.');
        return;
    }

    const isZoomClass = !!classItem.zoomLink;

    // Zoom membership logic - Alert only, no registration action needed
    if (isZoomMembership) {
        if (isZoomClass) {
            alert('אין צורך להירשם, יש להיכנס לקישור לזום בשעה הרצויה.');
        } else {
            alert('המנוי שלך הוא לזום בלבד. שיעורים בסטודיו אינם כלולים במנוי.');
        }
        return;
    }

    // Standard Studio membership (includes hybrid classes)
    let storageKey = 'myClassesGym';
    let myRegistrations = JSON.parse(localStorage.getItem(storageKey) || '[]');

    // Check if already registered
    if (myRegistrations.includes(classId)) {
        alert('כבר נרשמת לשיעור הזה.');
        return;
    }

    // Check weekly class limit
    if (weeklyClassLimit !== Infinity) {
        const today = new Date();
        const currentViewDate = new Date();
        currentViewDate.setDate(today.getDate() + (currentWeekOffset * 7));

        const currentDayOfWeek = currentViewDate.getDay();
        const startOfWeek = new Date(currentViewDate);
        startOfWeek.setDate(currentViewDate.getDate() - currentDayOfWeek);

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        const userClassesThisWeek = myRegistrations.filter(id => {
            const cls = classes.find(c => c.id === id);
            if (!cls) return false;
            const classDate = new Date(cls.date);
            return classDate >= startOfWeek && classDate <= endOfWeek;
        });

        // Enforce weekly class limit
        if (userClassesThisWeek.length >= weeklyClassLimit) {
            alert('הגעת למספר השיעורים המקסימלי לשבוע לפי המנוי שלך.');
            return;
        }
    }

    // Check class capacity for studio classes
    myRegistrations.push(classId);
    localStorage.setItem(storageKey, JSON.stringify(myRegistrations));
    alert(`נרשמת בהצלחה לשיעור: ${className}`);
    renderSchedule();
}

// Handles canceling a class registration and updating local storage
function cancelRegistration(classId) {
    if (confirm('האם לבטל את ההרשמה?')) {
        let myGymRegistrations = JSON.parse(localStorage.getItem('myClassesGym') || '[]');
        myGymRegistrations = myGymRegistrations.filter(id => id !== classId);
        localStorage.setItem('myClassesGym', JSON.stringify(myGymRegistrations));
        renderSchedule();
    }
}

// Initial Execution
setWeeklyDates();
renderSchedule();