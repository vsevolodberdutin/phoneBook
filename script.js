// create template for item
let contact1={name: 'Vsevolod Berdutin', phone: '0538521948', email: 'vsevolodberdutin@gmail.com', address: 'Jerusalem, Jaffa st. 212', description: 'Good programmer'};
let contact2={name: 'Sebastian Pereira', phone: '0533691909', email: 'Badman@gmail.com', address: 'Africa, Côte d’Ivoire', description: 'Black wood saler'};
let contact3={name: 'Captan Blad', phone: '0542211909', email: 'Captan@gmail.com', address: 'Tartuga', description: 'Sea wolf'};
// 

// create array for contacts data
let contactsArr = [];
//

let count = localStorage.getItem('count') ? parseInt(localStorage.getItem('count')) : 0;

for (let j = 0; j < count; ++j) {
  contactsArr.push(JSON.parse(localStorage.getItem(`key_${j}`)))
}
  console.log(contactsArr);
//

// query selectors
let dirAddCont = document.querySelector('.contact-view, .add-contact');
let btnAddNewCnt = document.querySelector('.btnAddNewCnt');
let ulLIst = document.querySelector('.list');
//

//contaact list
contList(contactsArr);
//

// onclick properties for button "add new contact"
btnAddNewCnt.onclick = function(event){
        dirAddCont.innerHTML = '';
        inputForm();
}
//

// create function for input contact drowing
function inputForm(){
   
    let formAdd = document.createElement('form');
    formAdd.action = '#';

        let inputName = document.createElement('input');
        inputName.className = 'form-control';
        inputName.type = 'text';
        inputName.name = 'name';
        inputName.placeholder = 'Type name';
        
        let inputPhone = document.createElement('input');
        inputPhone.className = 'form-control';
        inputPhone.type = 'text';
        inputPhone.name = 'phone';
        inputPhone.placeholder = 'Type phone';
    
        let inputEmail = document.createElement('input');
        inputEmail.className = 'form-control';
        inputEmail.type = 'text';
        inputEmail.name = 'email';
        inputEmail.placeholder = 'Type email';
        
        let inputAddress = document.createElement('input');
        inputAddress.className = 'form-control';
        inputAddress.type = 'text';
        inputAddress.name = 'address';
        inputAddress.placeholder = 'Type address';
        inputAddress.attributes = 'required';

        let inputDescription = document.createElement('textarea');
        inputDescription.className = 'form-control';
        inputDescription.type = 'text';
        inputDescription.name = 'description';
        inputDescription.placeholder = 'Type description';

        let divAddBtnInput = document.createElement('div');
        divAddBtnInput.className = 'buttons';
        
            let AddBtnInput = document.createElement('button');
            AddBtnInput.className = 'add-btn';
            AddBtnInput.innerText = 'Save';

            let nameVal = document.createElement('div');

           AddBtnInput.onclick = function(e){
                e.preventDefault();

                if (valFunc(inputName,inputPhone,inputEmail,inputAddress,inputDescription)){

                        nameVal.innerHTML = '';
                        nameVal.className = 'alert alert-success';
                        nameVal.innerText = 'Contact was added!';
                        formAdd.prepend(nameVal);

                        contactsArr.push({
                            name: inputName.value,
                            phone: inputPhone.value,
                            email: inputEmail.value,
                            address: inputAddress.value,
                            description: inputDescription.value
                        });
                        
                        ////////
                        localStorage.setItem(`key_${count++}`, JSON.stringify(contactsArr[contactsArr.length - 1]));
                        localStorage.setItem('count',count);
                        /////////

                        clearForm(inputName,inputPhone,inputEmail,inputAddress,inputDescription);

                        contList(contactsArr);

                    }else{
                        nameVal.innerHTML = '';
                        nameVal.className = 'alert alert-danger';
                        nameVal.innerText = 'All fields should be fill!';
                        formAdd.prepend(nameVal);
                    }
            }

    formAdd.append(inputName);
    formAdd.append(inputPhone);
    formAdd.append(inputEmail);
    formAdd.append(inputAddress);
    formAdd.append(inputDescription);
    formAdd.append(divAddBtnInput);
        divAddBtnInput.append(AddBtnInput);

    dirAddCont.append(formAdd);

    return dirAddCont;
}
//

// validation functions
function valFunc(input1,input2,input3,input4,input5){
let valIndex = 0;

  if (input1.value === ''){
    input1.className = 'form-control-danger';
  }else{input1.className = 'form-control'
  valIndex ++;}
  
  if (/\+?[0-9]+$/.test(input2.value)){
    input2.className = 'form-control';
    valIndex ++;
  }else{input2.className = 'form-control-danger';
    input2.value = '';}

  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input3.value)){
    input3.className = 'form-control';
    valIndex ++;
  }else{input3.className = 'form-control-danger';
    input3.value = '';}

  if (input4.value === ''){
    input4.className = 'form-control-danger';
  }else{input4.className = 'form-control'
  valIndex ++;}

if (valIndex === 4){
  
  return true}
else {return false};
}
//

//drowing the contact list
function contList(array){
  ulLIst.innerHTML = '';
  for (let i = 0; i < array.length; ++i) {

      let item = document.createElement('li');
      item.className = 'list-item item-active';
      
      let itemName = document.createElement('h2');
      itemName.className = 'title';
      itemName.innerText = contactsArr[i].name;

      let itemPhone = document.createElement('h2');
      itemPhone.className = 'sub-title';
      itemPhone.innerText = contactsArr[i].phone;

      var btnRem = document.createElement('div');
      btnRem.className = 'rem-btn';
          item.style.position = 'relative';
        let btnRemText = document.createElement('p');
        btnRemText.innerText = 'remove';

        
        item.append(itemName);
        item.append(itemPhone);
        
        item.append(btnRem);
        btnRem.append(btnRemText);
        
        ulLIst.append(item);
        
        if (i != contactsArr.length-1 ){

        item.onclick = function(event){
          dirAddCont.innerHTML = '';
         infCard(i);
        }

        }else if (i!=0){

          item.onclick = function( event ) {
            dirAddCont.innerHTML = '';
           infCard(contactsArr.length-1);
          
        }

      }else if (contactsArr.length === 1){

        item.onclick = function(event){
          dirAddCont.innerHTML = '';
         infCard(i);
        }

      }

        btnRem.onclick = function(e){
          dirAddCont.innerHTML = '';
          contactsArr.splice(i, 1);

          localStorage.removeItem(`key_${i}`);
           count--;
           localStorage.setItem('count',count);

          contList(contactsArr);
        }
  }
}
    
//Clear form
function clearForm(input1,input2,input3,input4,input5){
  input1.value = '';
  input2.value = '';
  input3.value = '';
  input4.value = '';
  input5.value = '';
}
//
//Fill form
function fillForm(input1,input2,input3,input4,input5,d1,d2,d3,d4,d5){
  input1.value = d1.innerText;
  input2.value = d2.innerText;
  input3.value = d3.innerText;
  input4.value = d4.innerText;
  input5.value = d5.innerText;
}
//
//drowing information card
function infCard(index){
 
  let cardHeader = document.createElement('div');
  cardHeader.className = 'header';

  dirAddCont.append(cardHeader);    


    let cardName = document.createElement('h2');
    cardName.innerText = contactsArr[index].name;

    cardHeader.append(cardName);

    let cardEdit = document.createElement('div');
    cardEdit.className = 'img-btn';
      let cardEditImg = document.createElement('img');
      cardEditImg.src = './img/edit.png';
      cardEditImg.alt = '';

    cardHeader.append(cardEdit);
      cardEdit.append(cardEditImg);


  let cardNum = document.createElement('div');
  cardNum.className = 'contact-view-row';
    let cardNumImg = document.createElement('img');
    cardNumImg.src = './img/technology.png';
    cardNumImg.alt = '';
      let cardNumText = document.createElement('h3');
      cardNumText.innerText = contactsArr[index].phone;
  
  dirAddCont.append(cardNum);
    cardNum.append(cardNumImg);
    cardNum.append(cardNumText);  


  let cardMail = document.createElement('div');
  cardMail.className = 'contact-view-row';
    let cardMailImg = document.createElement('img');
    cardMailImg.src = './img/multimedia.png';
    cardMailImg.alt = '';
      let cardMailText = document.createElement('h3');
      cardMailText.innerText = contactsArr[index].email;

  dirAddCont.append(cardMail);
    cardMail.append(cardMailImg);
    cardMail.append(cardMailText); 
        
      
  let cardAddr = document.createElement('div');
  cardAddr.className = 'contact-view-row';
    let cardAddrImg = document.createElement('img');
    cardAddrImg.src = './img/buildings.png';
    cardAddrImg.alt = '';
      let cardAddrText = document.createElement('h3');
      cardAddrText.innerText = contactsArr[index].address;

  dirAddCont.append(cardAddr);
    cardAddr.append(cardAddrImg);
    cardAddr.append(cardAddrText); 


  let cardDescr = document.createElement('p');
  cardDescr.innerText = contactsArr[index].description;

  dirAddCont.append(cardDescr);

  cardEdit.onclick = function(e){
    dirAddCont.innerHTML = '';
    redForm(cardName,cardNumText,cardMailText,cardAddrText,cardDescr,index)
  }
}
//

// create function for input contact drowing
function redForm(d1,d2,d3,d4,d5, index){
   
  let formAdd = document.createElement('form');
  formAdd.action = '#';

      let inputName = document.createElement('input');
      inputName.className = 'form-control';
      inputName.type = 'text';
      inputName.name = 'name';
      inputName.placeholder = 'Type name';
      
      let inputPhone = document.createElement('input');
      inputPhone.className = 'form-control';
      inputPhone.type = 'text';
      inputPhone.name = 'phone';
      inputPhone.placeholder = 'Type phone';
  
      let inputEmail = document.createElement('input');
      inputEmail.className = 'form-control';
      inputEmail.type = 'text';
      inputEmail.name = 'email';
      inputEmail.placeholder = 'Type email';
      
      let inputAddress = document.createElement('input');
      inputAddress.className = 'form-control';
      inputAddress.type = 'text';
      inputAddress.name = 'address';
      inputAddress.placeholder = 'Type address';
      inputAddress.attributes = 'required';

      let inputDescription = document.createElement('textarea');
      inputDescription.className = 'form-control';
      inputDescription.type = 'text';
      inputDescription.name = 'description';
      inputDescription.placeholder = 'Type description';

      let divAddBtnInput = document.createElement('div');
      divAddBtnInput.className = 'buttons';
      
          let AddBtnInput = document.createElement('button');
          AddBtnInput.className = 'add-btn';
          AddBtnInput.innerText = 'Save';

          let nameVal = document.createElement('div');

          fillForm(inputName,inputPhone,inputEmail,inputAddress,inputDescription,d1,d2,d3,d4,d5);

         AddBtnInput.onclick = function(e){
              e.preventDefault();


              if (valFunc(inputName,inputPhone,inputEmail,inputAddress,inputDescription)){

                      nameVal.innerHTML = '';
                      nameVal.className = 'alert alert-success';
                      nameVal.innerText = 'Contact was changed!';
                      formAdd.prepend(nameVal);

                      contactsArr[index] = {
                          name: inputName.value,
                          phone: inputPhone.value,
                          email: inputEmail.value,
                          address: inputAddress.value,
                          description: inputDescription.value
                      }

                      ulLIst.innerHTML = '';

                      contList(contactsArr);

                  }else{
                      nameVal.innerHTML = '';
                      nameVal.className = 'alert alert-danger';
                      nameVal.innerText = 'All fields should be fill!';
                      formAdd.prepend(nameVal);
                  }
          }

  formAdd.append(inputName);
  formAdd.append(inputPhone);
  formAdd.append(inputEmail);
  formAdd.append(inputAddress);
  formAdd.append(inputDescription);
  formAdd.append(divAddBtnInput);
      divAddBtnInput.append(AddBtnInput);

  dirAddCont.append(formAdd);

  return dirAddCont;
}
//
