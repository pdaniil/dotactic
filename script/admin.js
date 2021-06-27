


async function getLogin() {
  let response = await fetch('../server/checkSession.php');
  const result = await response.text();
  return result;
}

document.addEventListener('keydown', async function(event) {
  const login = await getLogin();
  if (event.code == 'KeyZ' && (event.ctrlKey || event.metaKey)) {
    if (login === 'IAmJakeHill'){
      const btnAdminPanel = document.querySelector('#btnOpenModalAddItemAdmin');
      const event = new Event("click");
      btnAdminPanel.dispatchEvent(event);
    }
  }
  else if (event.code == 'KeyX' && (event.ctrlKey || event.metaKey)) {
    if (login === 'IAmJakeHill'){
      const btnAdminPanel = document.querySelector('#btnOpenModalShowItemAdmin');
      const event = new Event("click");
      btnAdminPanel.dispatchEvent(event);
      document.querySelector('#cardItemPlace').textContent = '';
      printCard();
    }
  }
  else if (event.code == 'KeyC' && (event.ctrlKey || event.metaKey)) {
    if (login === 'IAmJakeHill'){
      document.querySelector('#cardItemPlace').textContent = '';
      printCard();
    }
  }
});



function createItemCard(id,nameItem, srcItem) {
  const cardItemPlace = document.querySelector('#cardItemPlace');
  const newItemDiv = document.createElement('div');
  newItemDiv.classList.add('col-xs-12', 'col-sm-6', 'col-md-6', 'col-lg-2');
  
  const idCard = document.createElement('div');
  idCard.textContent = id;
  idCard.style.visibility  = 'hidden';

  const newItemCard = document.createElement('div');
  newItemCard.classList.add('card','border-primary','md-3','text-center');
  newItemCard.style.width= '16rem';
  newItemCard.style.height = '10rem';

  newItemDiv.style.margin = '30px';

  const reduct = document.createElement('div');
  reduct.textContent = 'Редактировать';
  reduct.style.cursor = 'pointer';

  reduct.addEventListener('click', async function() {
    document.querySelector('.errorAdminItemUpdate').textContent = '';
    const idForUpdate = reduct.nextSibling.textContent;
    const btnUpdate = document.querySelector('#btnOpenModalUpdateItemAdmin');
    document.querySelector('#nameItemAdminUpdate').value = reduct.previousSibling.previousSibling.textContent;
    document.querySelector('#srcItemAdminUpdate').value = reduct.previousSibling.src;
    const event = new Event("click");
    btnUpdate.dispatchEvent(event);

    const btnUpdateCard = document.querySelector('#actionUpdateItemAdmin');
    

    btnUpdateCard.addEventListener('click', async function() {
      const newItem = {
        'name' : document.querySelector('#nameItemAdminUpdate').value,
        'src' : document.querySelector('#srcItemAdminUpdate').value,
      };
      const flag = await validItemInput(newItem);
      const itemForUpdate = {
        'id' : idForUpdate,
        'name' : newItem.name,
        'src' : newItem.src,
      };
      if (flag) {
        let response = await fetch('../server/update.php', {
          method: 'post',
          headers: {'Content-Type': 'application/json;charset=utf-8'},
          body: JSON.stringify(itemForUpdate),
        });
        const result = await response.text();
        document.querySelector('.errorAdminItemUpdate').textContent = '';


        const btnCloseUpdateWindow = document.querySelector('#closeUpdateWindow');
        btnCloseUpdateWindow.dispatchEvent(event);
        document.querySelector('#cardItemPlace').textContent = '';
        printCard();

      }
      else {
        document.querySelector('.errorAdminItemUpdate').textContent = 'Ошибка. Проверьте вводимые данные.';
      }

    });
    
    


  });

  const cardHeader = document.createElement('div');
  cardHeader.classList.add('card-header');
  cardHeader.textContent= nameItem;

  const btnClose = document.createElement('btn');
  btnClose.classList.add('btn-close');
  btnClose.setAttribute('type','button');
  btnClose.setAttribute('aria-label','close');
  btnClose.style.position = 'absolute';
  btnClose.style.marginLeft = '5px';
  btnClose.addEventListener('click',async function(){
    const idForDelete = btnClose.parentNode.parentNode.lastChild.textContent;
    let response = await fetch('../server/delete.php', {
      method: 'post',
      headers: {'Content-Type': 'application/json;charset=utf-8'},
      body: JSON.stringify(idForDelete),
    });
    document.querySelector('#cardItemPlace').textContent = '';
    printCard();
  });

  const imgItem = document.createElement('img');
  imgItem.style.width ='70px';
  imgItem.style.marginLeft ='85px';
  imgItem.style.marginTop = '10px'; 
  imgItem.style.paddingBottom = '10px';
  imgItem.src = srcItem;

  cardHeader.appendChild(btnClose);
  newItemCard.appendChild(cardHeader);
  newItemCard.appendChild(imgItem);
  newItemCard.appendChild(reduct);
  newItemCard.appendChild(idCard);
  newItemDiv.appendChild(newItemCard);

  cardItemPlace.appendChild(newItemDiv);

}

async function printCard() {
  let response = await fetch('../server/printAllItem.php');
  let result = await response.json();
  
  for (let i = 0;i < result.length; i++) {
    createItemCard(result[i].id,result[i].name, result[i].src);
  }

}

async function validItemInput(item) {
  if (item.name.trim() != '' && item.src.trim() != '') {
    let response = await fetch('../server/checkEqNameItem.php', {
      method: 'post',
      headers: {'Content-Type': 'application/json;charset=utf-8'},
      body: JSON.stringify(item.name),
    });
    let result = await response.text();
    if (result != '') {
      return false;
    }
    else {
      return true;
    };
  }
  else {
    return false;
  }
  

  


}

document.querySelector('.errorAdminItem').textContent = '';
async function sendItem() {

  const newItem = {
    'name' : document.querySelector('#nameItemAdmin').value,
    'src' : document.querySelector('#srcItemAdmin').value,
  };

  const flag = await validItemInput(newItem);
  if (flag) {
   let response = await fetch('../server/sendItem.php', {
    method: 'post',
    headers: {'Content-Type': 'application/json;charset=utf-8'},
    body: JSON.stringify(newItem),
  });
   const result = await response.text();
   document.querySelector('.errorAdminItem').textContent = 'Успешно!';
   document.querySelector('#nameItemAdmin').value = '';
   document.querySelector('#srcItemAdmin').value = '';
 }
 else {
  document.querySelector('.errorAdminItem').textContent = 'Ошибка, заполните все поля правильно.';
}

}

const actionAddItemAdmin = document.querySelector('#actionAddItemAdmin');
actionAddItemAdmin.addEventListener('click',sendItem);

