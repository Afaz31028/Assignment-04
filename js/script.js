let interviewJobList = [];
let rejectedJobList = [];
let currentStatus = 'all-filter-btn';

const allCount = document.getElementById('total-count');
const interviewCount = document.getElementById('interview-count');
const rejectedCount = document.getElementById('rejected-count');
const availableJobs = document.querySelector('.avialable-jobs');
const filteredAvailableJobs = document.querySelector('.filtered-availbale-jobs');

const totalJobs = document.querySelectorAll('.job-card');
const allJobs = document.querySelector('.job-cards');

const interviewSection = document.querySelector('.interview-filtered-section');
const rejectedSection = document.querySelector('.rejected-filtered-section');


const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');

const deleteIcons = document.querySelectorAll('.deleteIcon');

function jobCount() {
    const totalJobs = allJobs.querySelectorAll('.job-card');
    allCount.innerText = totalJobs.length;
    interviewCount.innerText = interviewJobList.length;
    rejectedCount.innerText = rejectedJobList.length;
    availableJobs.innerHTML = totalJobs.length;
}
jobCount();

function filteredJobCount(btnName) {
    const cnt=allJobs.querySelectorAll('.job-card');
    allCount.innerText= cnt.length;
    interviewCount.innerText = interviewJobList.length;
    rejectedCount.innerText = rejectedJobList.length;
    if (btnName === 'Interview') {
        filteredAvailableJobs.innerHTML = `${interviewCount.innerText} of `
    }
    else if (btnName === "Rejected") {
        filteredAvailableJobs.innerHTML = `${rejectedCount.innerText} of `
    }
}

const mainSection = document.querySelector('.job-cards');
mainSection.addEventListener('click', function (e) {

    const currentCard = e.target.parentNode.parentNode.parentNode;
    const jobTitle = currentCard.querySelector('.job-title').innerText;
    const jobDesignation = currentCard.querySelector('.job-designation').innerText;
    const jobDetails = currentCard.querySelector('.job-details').innerText;
    const jobOverview = currentCard.querySelector('.job-overview').innerText;

    if (e.target.innerText == 'Interview') {
        currentCard.querySelector('.job-badge').innerText = "Interview";
        currentCard.querySelector('.job-badge').classList.remove('bg-[#EEF4FF]', 'bg-red-400');
        currentCard.querySelector('.job-badge').classList.add('bg-green-400');

        const jobData = {
            jobTitle,
            jobDesignation,
            jobDetails,
            jobBadge: 'Interview',
            jobOverview
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
            jobOverview
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
    if (mainSection.children.length === 0) {
        const blankPage = document.querySelector('.main-blank-page');
        blankPage.classList.remove('hidden');
    }
    else {
        deleteIcons.forEach(icon => {
            icon.addEventListener('click', function (e) {
                const jobCard = e.target.closest('.job-card');
                const jobStatus = jobCard.querySelector('.job-badge').innerText;
                const jobTitle = jobCard.querySelector('.job-title').innerText;
                jobCard.remove();
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
    }
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
        interviewSection.classList.remove('hidden');
        allJobs.classList.add('hidden');
        rejectedSection.classList.add('hidden');
        filteredAvailableJobs.classList.remove('hidden');
        filteredJobCount("Interview");
        renderInterviewSection();

    }
    else if (currentStatus === 'rejected-filter-btn') {
        allJobs.classList.add('hidden');
        interviewSection.classList.add('hidden');
        rejectedSection.classList.remove('hidden');
        filteredAvailableJobs.classList.remove('hidden');
        filteredJobCount("Rejected");
        renderRejectedSection();
    }
    else {
        interviewSection.classList.add('hidden');
        rejectedSection.classList.add('hidden');
        allJobs.classList.remove('hidden');
        filteredAvailableJobs.classList.add('hidden');
    }
}


function renderInterviewSection() {
    interviewSection.innerHTML = '';

    if (interviewJobList.length === 0) {
        interviewSection.innerHTML = `
            <div class="interview-blank-page bg-white flex mt-5 justify-center items-center rounded-2xl">
                <div class="content px-10 py-13 mx-auto text-center">
                    <i class="fa-solid fa-file-lines text-7xl text-blue-500"></i><br>
                    <h2 class="text-2xl font-semibold mt-5">No jobs available</h2>
                    <p class="text-[#64748B]">Check back soon for new job opportunities</p>
                </div>
            </div>
        `;
    }
    else {
        const container = document.createElement('div');
        container.className = 'space-y-5';

        for (const job of interviewJobList) {
            const jobCard = document.createElement('div');
            jobCard.className = 'job-card flex justify-between bg-white p-6 rounded-lg';
            jobCard.innerHTML = `
                <div class="card-left">
                    <h3 class="job-title text-[18px] font-semibold">${job.jobTitle}</h3>
                    <p class="job-designation text-[#64748B]">${job.jobDesignation}</p>
                    <p class="job-details text-[#64748B] text-sm mt-5">${job.jobDetails}</p>
                    <span class="job-badge badge bg-green-400 px-3 py-4 text-sm font-medium mt-5">${job.jobBadge}</span>
                    <p class="job-overview text-sm mt-2">${job.jobOverview}</p>
                    <div class="card-btn mt-5 flex gap-2">
                        <button class="card-btn btn border-accent text-accent">Interview</button>
                        <button class="card-card-btn btn border-error text-error">Rejected</button>
                    </div>
                </div>
                <div class="delete-icon md:border rounded-full w-15 h-8 md:w-8 md:h-8 md:p-2 border-gray-300">
                    <button class="deleteIcon">
                        <img class="w-full" src="./images/trash_bin_icon-icons.com_67981.png" alt="">
                    </button>
                </div>
            `;
            container.appendChild(jobCard);
        }
        interviewSection.appendChild(container);

        const deleteIcons = interviewSection.querySelectorAll('.deleteIcon');
        deleteIcons.forEach(icon => {
            icon.addEventListener('click', function (e) {
                e.stopPropagation();
                const removedCard = e.target.closest('.job-card');
                const name=removedCard.querySelector('.job-title');
                // console.log(name.innerText);
                const items=allJobs.querySelectorAll('.job-card');
                items.forEach(child=>{
                    // console.log(child)
                    const item=child.querySelector('.job-badge');
                    const title=child.querySelector('.job-title');
                    if(title.innerText===name.innerText){
                        item.innerText="Not Applied"
                        item.classList.remove('bg-green-400');
                        item.classList.add('bg-[#EEF4FF]');
                    }
                    // console.log(item.innerText)
                })
                
                if (removedCard) {
                    const jobTitle = removedCard.querySelector('.job-title').innerText;
                    interviewJobList = interviewJobList.filter(card => card.jobTitle !== jobTitle);
                    removedCard.remove();
                    filteredJobCount("Interview");

                    if (interviewJobList.length === 0) {
                        renderInterviewSection();
                    }
                }
            });
        });
    }
}
function renderRejectedSection() {
    rejectedSection.innerHTML = '';
    if (rejectedJobList.length === 0) {
        rejectedSection.innerHTML = `
            <div class="interview-blank-page bg-white flex mt-5 justify-center items-center rounded-2xl">
                <div class="content px-10 py-13 mx-auto text-center">
                    <i class="fa-solid fa-file-lines text-7xl text-blue-500"></i><br>
                    <h2 class="text-2xl font-semibold mt-5">No jobs available</h2>
                    <p class="text-[#64748B]">Check back soon for new job opportunities</p>
                </div>
            </div>
        `;
    }
    else {
        const container = document.createElement('div');
        container.className = 'space-y-5';

        for (const job of rejectedJobList) {
            const jobCard = document.createElement('div');
            jobCard.className = 'job-card flex justify-between bg-white p-6 rounded-lg';

            jobCard.innerHTML = `
                <div class="card-left">
                    <h3 class="job-title text-[18px] font-semibold">${job.jobTitle}</h3>
                    <p class="job-designation text-[#64748B]">${job.jobDescription}</p>
                    <p class="job-details text-[#64748B] text-sm mt-5">${job.jobDetails}</p>
                    <span class="job-badge badge bg-red-400 px-3 py-4 text-sm font-medium mt-5">${job.jobBadge}</span>
                    <p class="job-overview text-sm mt-2">${job.jobOverview}</p>
                    <div class="card-btn mt-5 flex gap-2">
                        <button class="card-btn btn border-accent text-accent">Interview</button>
                        <button class="card-card-btn btn border-error text-error">Rejected</button>
                    </div>
                </div>
                <div class="delete-icon md:border rounded-full w-15 h-8 md:w-8 md:h-8 md:p-2 border-gray-300">
                    <button class="deleteIcon">
                        <img class="w-full" src="./images/trash_bin_icon-icons.com_67981.png" alt="">
                    </button>
                </div>
            `;
            container.appendChild(jobCard);
        }
        rejectedSection.appendChild(container);

        const deleteIcons = rejectedSection.querySelectorAll('.deleteIcon');
        deleteIcons.forEach(icon => {
            icon.addEventListener('click', function (e) {
                e.stopPropagation();
                const removedCard = e.target.closest('.job-card');
                const jobName=removedCard.querySelector('.job-title');
                // console.log(name.innerText);
                const items=allJobs.querySelectorAll('.job-card');
                items.forEach(child=>{
                    // console.log(child)
                    const item=child.querySelector('.job-badge');
                    const title=child.querySelector('.job-title');
                    if(title.innerText===jobName.innerText){
                        item.innerText="Not Applied"
                        item.classList.remove('bg-red-400');
                        item.classList.add('bg-[#EEF4FF]');
                    }
                })
                if (removedCard) {
                    const jobTitle = removedCard.querySelector('.job-title').innerText;
                    rejectedJobList = rejectedJobList.filter(card => card.jobTitle !== jobTitle);
                    removedCard.remove();
                    filteredJobCount("Rejected");

                    if (rejectedJobList.length === 0) {
                        renderRejectedSection();
                    }
                }
            });
        });
    }
}

interviewSection.addEventListener('click', function (e) {
    // console.log(e.target)
    e.stopPropagation();
    const currentCard = e.target.closest('.job-card');
    const jobTitle = currentCard.querySelector('.job-title').innerText;
    const jobDesignation = currentCard.querySelector('.job-designation').innerText;
    const jobDetails = currentCard.querySelector('.job-details').innerText;
    const jobOverview = currentCard.querySelector('.job-overview').innerText;

    if (e.target.innerText === 'Rejected') {

        currentCard.querySelector('.job-badge').innerText = "Rejected";
        currentCard.querySelector('.job-badge').classList.remove('bg-[#EEF4FF]', 'bg-green-400');
        currentCard.querySelector('.job-badge').classList.add('bg-red-400');

        const jobData = {
            jobTitle,
            jobDesignation,
            jobDetails,
            jobBadge: 'Rejected',
            jobOverview
        }
        const all=allJobs.querySelectorAll('.job-card');
        // console.log(all)
        all.forEach(card=>{
            // console.log(card)
            const cardTitle=card.querySelector('.job-title').innerText;
            const cardBadge=card.querySelector('.job-badge');
            if(cardTitle===jobTitle){
                console.log(cardTitle, jobTitle);
                cardBadge.innerText="Rejected";
                cardBadge.classList.remove('bg-green-400','bg-[#EEF4FF]');
                cardBadge.classList.add('bg-red-400');
                filteredJobCount();

            }
        })
        const isCardExist = rejectedJobList.find(card => card.jobTitle == jobData.jobTitle);
        if (!isCardExist) {
            rejectedJobList.push(jobData);
        }

        rejectedSection.appendChild(e.target.closest('.job-card'));
        interviewJobList = interviewJobList.filter(card => card.jobTitle !== jobData.jobTitle);

        if(interviewJobList.length===0){
            interviewSection.innerHTML=`
                <div class="bg-white hidden mt-5 justify-center items-center rounded-2xl">
                <div class="content px-10 py-13 mx-auto text-center">
                <i class="fa-solid fa-file-lines text-7xl text-blue-500"></i><br>
                <h2 class="text-2xl font-semibold mt-5">No jobs available</h2>
                <p class="text-[#64748B]">Check back soon for new job opportunities</p>
            </div>
        </div>
            `
            renderInterviewSection();
        }
        filteredJobCount();
        filteredAvailableJobs.innerHTML=`${interviewJobList.length} of `;
        if (currentStatus === 'interview-filter-btn') {
            renderRejectedSection();
        }
        filteredJobCount();
    }
})

rejectedSection.addEventListener('click', function (e) {
    e.stopPropagation();
    const currentCard = e.target.closest('.job-card');
    const jobTitle = currentCard.querySelector('.job-title').innerText;
    const jobDesignation = currentCard.querySelector('.job-designation').innerText;
    const jobDetails = currentCard.querySelector('.job-details').innerText;
    const jobOverview = currentCard.querySelector('.job-overview').innerText;

    if (e.target.innerText == 'Interview') {

        currentCard.querySelector('.job-badge').innerText = "Interview";
        currentCard.querySelector('.job-badge').classList.remove('bg-[#EEF4FF]', 'bg-red-400');
        currentCard.querySelector('.job-badge').classList.add('bg-green-400');

        const jobData = {
            jobTitle,
            jobDesignation,
            jobDetails,
            jobBadge: 'Interview',
            jobOverview
        }
        const all=allJobs.querySelectorAll('.job-card');
        // console.log(all)
        all.forEach(card=>{
            // console.log(card)
            const cardTitle=card.querySelector('.job-title').innerText;
            const cardBadge=card.querySelector('.job-badge');
            if(cardTitle===jobTitle){
                // console.log(cardTitle, jobTitle);
                cardBadge.innerText="Interview";
                cardBadge.classList.remove('bg-red-400','bg-[#EEF4FF]');
                cardBadge.classList.add('bg-green-400');
            }
        })
        const isCardExist = interviewJobList.find(card => card.jobTitle == jobData.jobTitle);
        if (!isCardExist) {
            interviewJobList.push(jobData);
        }
        interviewSection.appendChild(e.target.closest('.job-card'));

        rejectedJobList = rejectedJobList.filter(card => card.jobTitle !== jobData.jobTitle);
        if(rejectedJobList.length===0){
            rejectedSection.innerHTML=`
                <div class="bg-white hidden mt-5 justify-center items-center rounded-2xl">
                <div class="content px-10 py-13 mx-auto text-center">
                <i class="fa-solid fa-file-lines text-7xl text-blue-500"></i><br>
                <h2 class="text-2xl font-semibold mt-5">No jobs available</h2>
                <p class="text-[#64748B]">Check back soon for new job opportunities</p>
            </div>
        </div>
            `
            renderRejectedSection();
        }
        filteredJobCount();
        filteredAvailableJobs.innerHTML=`${rejectedJobList.length} of `;
        console.log(filteredAvailableJobs.innerText);
        if (currentStatus === 'reject-filter-btn') {
            renderRejectedSection();
        }
    }
})