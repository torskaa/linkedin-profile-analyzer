// Extract profile data from LinkedIn page
function extractProfileData() {
  const name = document.querySelector('.text-heading-xlarge')?.textContent || '';
  const headline = document.querySelector('.text-body-medium')?.textContent || '';
  const about = document.querySelector('.display-flex.ph5.pv3 .display-flex.flex-row.justify-space-between span')?.textContent || '';
  const experience = Array.from(document.querySelectorAll('#experience ~ .pvs-list__outer-container > ul > li'))
    .map(item => item.textContent)
    .join(' ');

  return `${name} ${headline} ${about} ${experience}`;
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getProfileData") {
    const profileData = extractProfileData();
    sendResponse({ profileData });
  }
});