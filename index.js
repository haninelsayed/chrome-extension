
let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const deleteLast = document.getElementById("delete-last")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads"))
const tabBtn = document.getElementById("tab-btn")

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click", function() {    
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      myLeads.push(tabs[0].url)
      localStorage.setItem("myLeads", JSON.stringify(myLeads))
      render(myLeads)
  })
})

function render(leads) {
  let listItems = ""
  for (let i = 0; i < leads.length; i++) {
      // template string - template literal
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
        // (alternative solution for line 14)
        // const li = document.createElement("li")
        // li.textContent = myLeads[i]
        // ulEl.append(li)
      }
    ulEl.innerHTML = listItems  
}

deleteBtn.addEventListener("click", function() {
localStorage.clear()
myLeads = []
render(myLeads)
})

deleteLast.addEventListener("click", function() {
  // let deleteRecord = JSON.parse(localStorage.getItem("myLeads"))
  // for (let i = 0; i < deleteRecord.length; i++) {
  //         deleteRecord.pop()       
  // }
  // localStorage.setItem("myLeads", JSON.stringify(deleteRecord))
  myLeads.pop()
  render(myLeads)
})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
})