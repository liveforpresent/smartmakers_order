const buyer = document.getElementById('buyer');
const phone = document.getElementById('phone');
const neonTypeList = document.getElementsByName('neon_type');
const neonWidth = document.getElementById('neon_width');
const neonHeight = document.getElementById('neon_height');
const neonContent = document.getElementById('neon_content');
const reqContents = document.getElementById('req_contents');
const constructionList = document.getElementsByName('construction');
const orderForm = document.getElementById('order_form');
var neonType = ""
var construction = "";
neonTypeList.forEach(element => {
    element.addEventListener("click", (e) => {
        if (e.currentTarget.checked) neonType = e.currentTarget.value;
    });
});
constructionList.forEach(element => {
    element.addEventListener("click", (e) => {
        if (e.currentTarget.checked) construction = e.currentTarget.value;
    });
});

elements = [buyer, phone, neonWidth, neonHeight, neonContent, reqContents];

orderForm.addEventListener("submit", (event) => {
    console.log(neonType);
    for(var i = 0; i < elements.length; i++){
        if(!elements[i].value){
            elements[i].focus();
            event.preventDefault();
            return false;
        }
    }
    if(neonType == ""){
        neonTypeList[0].focus();
        event.preventDefault();
        console.log('f');
        return false;
    }
    if(construction == ""){
        constructionList[0].focus();
        event.preventDefault();
        console.log('f');
        return false;
    }

    if (!confirm("제출 하시겠습니까?")){
        event.preventDefault();
        return false;
    }

    console.log('success');

    return true;
});
