
let interviewJobList = [];
let rejectedJobList = [];
let currentStatus = 'all-filter-btn';

const allCount = document.getElementById('total-count');
const interviewCount = document.getElementById('interview-count');
const rejectedCount = document.getElementById('rejected-count');
const totalJobs = document.querySelectorAll('.job-card');
const allJobs = document.querySelector('.job-cards');

const interviewSection = document.querySelector('.interview-filtered-section');
const rejectedSection = document.querySelector('.rejected-filtered-section');

const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');

const deleteIcons = document.querySelectorAll('.deleteIcon');

function jobCount() {
    const totalJobs = document.querySelectorAll('.job-card');
    allCount.innerText = totalJobs.length;
    interviewCount.innerText = interviewJobList.length;
    rejectedCount.innerText = rejectedJobList.length;
}
jobCount();

const mainSection = document.querySelector('.job-cards');
mainSection.addEventListener('click', function (e) {

    const currentCard = e.target.parentNode.parentNode.parentNode;
    const jobTitle = currentCard.querySelector('.job-title').innerText;
    const jobDesignation = currentCard.querySelector('.job-designation').innerText;
    const jobDetails = currentCard.querySelector('.job-details').innerText;
    const jobOberview = currentCard.querySelector('.job-overview').innerText;

    if (e.target.innerText == 'Interview') {
        currentCard.querySelector('.job-badge').innerText = "Interview";
        currentCard.querySelector('.job-badge').classList.remove('bg-[#EEF4FF]', 'bg-red-400');
        currentCard.querySelector('.job-badge').classList.add('bg-green-400');

        const jobData = {
            jobTitle,
            jobDesignation,
            jobDetails,
            jobBadge: 'Interview',
            jobOberview
        }
        const isCardExist = interviewJobList.find(card => card.jobTitle == jobData.jobTitle);
        if (!isCardExist) {
            interviewJobList.push(jobData);
        }

        rejectedJobList = rejectedJobList.filter(card => card.jobTitle !== jobData.jobTitle);
        if (currentStatus === 'reject-filter-btn') {
            renderRejectedSection();
        }
        jobCount();
    }
    else if (e.target.innerText == 'Rejected') {
        currentCard.querySelector('.job-badge').innerText = "Rejected";
        currentCard.querySelector('.job-badge').classList.remove('bg-[#EEF4FF]', 'bg-green-400');
        currentCard.querySelector('.job-badge').classList.add('bg-red-400');

        const jobData = {
            jobTitle,
            jobDesignation,
            jobDetails,
            jobBadge: 'Rejected',
            jobOberview
        }
        const isCardExist = rejectedJobList.find(card => card.jobTitle == jobData.jobTitle);
        if (!isCardExist) {
            rejectedJobList.push(jobData);
            jobCount();
        }
        interviewJobList = interviewJobList.filter(card => card.jobTitle !== jobData.jobTitle);
        if (currentStatus === 'interview-filter-btn') {
            renderRejectedSection();
        }
        jobCount();
    }
    deleteIcons.forEach(icon => {
        icon.addEventListener('click', function (e) {
            const jobCard = e.target.closest('.job-card');
            jobCard.remove();
            const jobStatus = jobCard.querySelector('.job-badge').innerText;
            const jobTitle = jobCard.querySelector('.job-title').innerText;
            if (jobStatus === 'Interview') {
                interviewJobList = interviewJobList.filter(card => card.jobTitle !== jobTitle);
                jobCard.remove();
            }
            else if (jobStatus === 'Rejected') {
                rejectedJobList = rejectedJobList.filter(card => card.jobTitle !== jobTitle);
                jobCard.remove();
            }
            jobCount();
        })
    })

})

function clickedBtn(id) {
    allFilterBtn.classList.add('bg-white', 'text-[#64748B]');
    interviewFilterBtn.classList.add('bg-white', 'text-[#64748B]');
    rejectedFilterBtn.classList.add('bg-white', 'text-[#64748B]');

    allFilterBtn.classList.remove('bg-primary', 'text-white');
    interviewFilterBtn.classList.remove('bg-primary', 'text-white');
    rejectedFilterBtn.classList.remove('bg-primary', 'text-white');

    const curFilterBtn = document.getElementById(id);
    curFilterBtn.classList.remove('bg-white', 'text-[#64748B]');
    curFilterBtn.classList.add('bg-primary', 'text-white');

    currentStatus = id;
    if (currentStatus === 'interview-filter-btn') {
        allJobs.classList.add('hidden');
        rejectedSection.classList.add('hidden');
        interviewSection.classList.remove('hidden');
        renderInterviewSection();
    }
    else if (currentStatus === 'rejected-filter-btn') {
        allJobs.classList.add('hidden');
        interviewSection.classList.add('hidden');
        rejectedSection.classList.remove('hidden');
        renderRejectedSection();
    }
    else {
        interviewSection.classList.add('hidden');
        rejectedSection.classList.add('hidden');
        allJobs.classList.remove('hidden');
    }
}


function renderInterviewSection() {
    interviewSection.innerHTML = '';
    for (const job of interviewJobList) {
        const newDiv = document.createElement('div');
        newDiv.className = 'mt-4 space-y-5';

        newDiv.innerHTML = `
            <div class="job-card flex justify-between bg-white p-6 rounded-lg">
                <div class="card-left">
                    <h3 class="job-title text-[18px] font-semibold">${job.jobTitle}</h3>
                    <p class="job-designation text-[#64748B]">React Native Developer</p>
                    <p class="job-details text-[#64748B] text-sm mt-5">Remote • Full-time • $130,000 - $175,000</p>
                    <span class="job-badge badge bg-green-400 px-3 py-4 text-sm font-medium mt-5">${job.jobBadge}</span>
                    <p class="job-overview text-sm mt-2">Build cross-platform mobile applications using React Native. Work on
                        products used by millions of users worldwide.</p>
                    <div class="card-btn mt-5 flex gap-2">
                        <button class="card-btn btn border-accent text-accent">Interview</button>
                        <button class="card-card-btn btn border-error text-error">Rejected</button>
                    </div>
                </div>
                <div class="delete-icon border rounded-full w-8 h-8 p-2 border-gray-300">
                    <button class="deleteIcon">
                        <img class="w-6" src="./images/trash_bin_icon-icons.com_67981.png" alt="">
                    </button>
                </div>
            </div>
        `
        interviewSection.appendChild(newDiv);
    }
    const selectedIcons = document.querySelectorAll('.deleteIcon');
    selectedIcons.forEach(icon => {
        icon.addEventListener('click', function (e) {
            const removedCard = e.target.closest('.job-card');
            const jobTitle = removedCard.querySelector('.job-title').innerText;
            interviewJobList = interviewJobList.filter(card => card.jobTitle !== jobTitle);
            removedCard.remove();
            jobCount();
        })
    })
}

function renderRejectedSection() {
    rejectedSection.innerHTML = '';
    for (const job of rejectedJobList) {
        const newDiv = document.createElement('div');
        newDiv.className = 'mt-4 space-y-5';

        newDiv.innerHTML = `
            <div class="job-card flex justify-between bg-white p-6 rounded-lg">
                <div class="card-left">
                    <h3 class="job-title text-[18px] font-semibold">${job.jobTitle}</h3>
                    <p class="job-designation text-[#64748B]">React Native Developer</p>
                    <p class="job-details text-[#64748B] text-sm mt-5">Remote • Full-time • $130,000 - $175,000</p>
                    <span class="job-badge badge bg-red-500 px-3 py-4 text-sm font-medium mt-5">${job.jobBadge}</span>
                    <p class="job-overview text-sm mt-2">Build cross-platform mobile applications using React Native. Work on
                        products used by millions of users worldwide.</p>
                    <div class="card-btn mt-5 flex gap-2">
                        <button class="card-btn btn border-accent text-accent">Interview</button>
                        <button class="card-card-btn btn border-error text-error">Rejected</button>
                    </div>
                </div>
                <div class="delete-icon border rounded-full w-8 h-8 p-2 border-gray-300">
                    <button class="deleteIcon">
                        <img class="w-6" src="./images/trash_bin_icon-icons.com_67981.png" alt="">
                    </button>
                </div>
            </div>
        `
        rejectedSection.appendChild(newDiv);
    }
    const deleteCard = document.querySelectorAll('.deleteIcon');
    deleteCard.forEach(icon => {
        icon.addEventListener('click', function (e) {
            const removedCard = e.target.closest('.job-card');
            const jobTitle = removedCard.querySelector('.job-title').innerText;
            rejectedJobList = rejectedJobList.filter(card => card.jobTitle !== jobTitle);
            removedCard.remove();
            jobCount();
        })
    })
}

interviewSection.addEventListener('click', function (e) {
    const currentCard = e.target.parentNode.parentNode.parentNode;
    const jobTitle = currentCard.querySelector('.job-title').innerText;
    const jobDesignation = currentCard.querySelector('.job-designation').innerText;
    const jobDetails = currentCard.querySelector('.job-details').innerText;
    const jobOberview = currentCard.querySelector('.job-overview').innerText;

    if (e.target.innerText === 'Rejected') {

        currentCard.querySelector('.job-badge').innerText = "Rejected";
        currentCard.querySelector('.job-badge').classList.remove('bg-[#EEF4FF]', 'bg-green-400');
        currentCard.querySelector('.job-badge').classList.add('bg-red-400');

        const jobData = {
            jobTitle,
            jobDesignation,
            jobDetails,
            jobBadge: 'Rejected',
            jobOberview
        }
        const isCardExist = rejectedJobList.find(card => card.jobTitle == jobData.jobTitle);
        if (!isCardExist) {
            rejectedJobList.push(jobData);
        }

        rejectedSection.appendChild(e.target.closest('.job-card'));
        interviewJobList = interviewJobList.filter(card => card.jobTitle !== jobData.jobTitle);
        if (currentStatus === 'interview-filter-btn') {
            renderRejectedSection();
        }
        jobCount();
    }
})

rejectedSection.addEventListener('click', function (e) {
    const currentCard = e.target.parentNode.parentNode.parentNode;
    const jobTitle = currentCard.querySelector('.job-title').innerText;
    const jobDesignation = currentCard.querySelector('.job-designation').innerText;
    const jobDetails = currentCard.querySelector('.job-details').innerText;
    const jobOberview = currentCard.querySelector('.job-overview').innerText;

    if (e.target.innerText == 'Interview') {

        currentCard.querySelector('.job-badge').innerText = "Interview";
        currentCard.querySelector('.job-badge').classList.remove('bg-[#EEF4FF]', 'bg-red-400');
        currentCard.querySelector('.job-badge').classList.add('bg-green-400');

        const jobData = {
            jobTitle,
            jobDesignation,
            jobDetails,
            jobBadge: 'Interview',
            jobOberview
        }
        const isCardExist = interviewJobList.find(card => card.jobTitle == jobData.jobTitle);
        if (!isCardExist) {
            interviewJobList.push(jobData);
        }
        interviewSection.appendChild(e.target.closest('.job-card'));
        rejectedJobList = rejectedJobList.filter(card => card.jobTitle !== jobData.jobTitle);
        if (currentStatus === 'reject-filter-btn') {
            renderRejectedSection();
        }
        jobCount();
    }
})





