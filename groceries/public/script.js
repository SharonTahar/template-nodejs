const addItem = () => {
    const i = document.getElementById('item').value;
    const q = document.getElementById('quantity').value;
    const data = {
        item: i,
        quantity: q
    }
    fetchItem(data)
    document.getElementById('item').value = '';
    document.getElementById('quantity').value = '';
};

const fetchItem = (data) => {
    fetch('http://localhost:3000', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => showItems(data));
}

const showItems = (data) => {
    let root = document.getElementById('root');
    console.log(data);
    root.innerHTML = "";
    data.forEach((item) => {
        let div = document.createElement('h4');
        div.innerText = item.item + " : " + item.quantity;
        root.appendChild(div);
    })
}