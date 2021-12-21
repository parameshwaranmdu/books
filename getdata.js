var accesstoken;
var Get_itemnames;
var Url = window.location.href.split('&')
var Add_result;
var Get_customersnames;


function getaccesstoken() {
    document.getElementById('textbox').style.display = '';
    document.getElementById('item_selectbox').style.display = 'none'
    document.getElementById('cus_selectbox').style.display = 'none'
    document.getElementById('invoice-btn').style.display = 'none'
    Url.forEach(function(url) {
        let splitUrl = url.split('=');
        if (splitUrl[0] == "access_token") {
            accesstoken = splitUrl[1];
        }
    })

}

function finddata() {

    var error_meg = document.getElementById('err-meg');
    let Get_inputvalue = document.getElementById('org-id').value;
    let loading_image = document.getElementById('loading-img');
    loading_image.style.display = 'inline-block';

    var requestOptions = {
        method: 'GET',
        headers: {
            Authorization: `Zoho-oauthtoken ${accesstoken}`
        },
        redirect: 'follow'
    };


    fetch(`https://books.zoho.com/api/v3/items?organization_id=${Get_inputvalue}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.message == 'success') {
                Get_itemnames = result.items;
                loading_image.style.display = '';
                document.getElementById('invoice-btn').style.display = ''

                setitems()
            } else {
                error_meg.innerHTML = result.message
            }

        })

    .catch(error => console.log('error-meg', error));

    fetch(`https://books.zoho.com/api/v3/contacts?organization_id=${Get_inputvalue}&contact_type=customer`, requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.message == 'success') {
                Get_customersnames = result.contacts;
                loading_image.style.display = '';

                setcustomer()
            } else {
                error_meg.innerHTML = result.message
            }

        })

    .catch(error => console.log('error-meg', error));
}



function setitems() {
    document.getElementById('textbox').style.display = 'none';
    document.getElementById('item_selectbox').style.display = '';
    let list_item = document.getElementById('listitems');
    let tect_node = document.createTextNode;

    let create_select = document.createElement('select');
    create_select.addEventListener("change", () => openinvoice())

    create_select.setAttribute('class', 'selectbox')

    for (let i = 0; i < Get_itemnames.length; i++) {
        let create_option = document.createElement('option');
        tect_node = Get_itemnames[i].name;
        create_option.append(tect_node);
        create_select.append(create_option);
        list_item.append(create_select)
    }
}

function setcustomer() {

    document.getElementById('textbox').style.display = 'none';
    document.getElementById('cus_selectbox').style.display = '';
    let list_item = document.getElementById('listcustomers');
    let tect_node = document.createTextNode;

    let create_select = document.createElement('select');

    create_select.setAttribute('class', 'cus-selectbox')

    for (let i = 0; i < Get_customersnames.length; i++) {
        let create_option = document.createElement('option');
        tect_node = Get_customersnames[i].company_name;
        create_option.append(tect_node);
        create_select.append(create_option);
        list_item.append(create_select)
    }

}

function openinvoice() {
    console.log(document.getElementsByClassName("selectbox")[0].value);
    console.log(document.getElementsByClassName("cus-selectbox")[0].value);
}

// 767183177