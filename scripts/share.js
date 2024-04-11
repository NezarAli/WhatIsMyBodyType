var id = new URLSearchParams(window.location.search).get('id');
var shareModal;

if (!isValidId()) {
    document.getElementById('share').style.display = 'inline'
} else {
    const name = id.get('name');
    const bmi = id.get('bmi');
    const pbf = id.get('pbf');

    if (name != "") {
        document.getElementById('header').style.display = 'block'
        document.getElementById('name').innerHTML = name + "'s"
    }

    bmiInput.value = bmi;
    pbfInput.value = pbf;

    bmiInput.disabled = true;
    pbfInput.disabled = true;

    drawPoint(bmiInput.value, pbfInput.value);

    document.getElementById('redirect').style.display = 'inline'
}

function isValidId() {
    if (id == null) {
        return false;
    }

    try {
        id = new URLSearchParams(atob(id));
        return true;
    } catch (error) {
        return false;
    }
}

document.getElementById('share').addEventListener('click', function () {
    document.getElementById("nameInput").value = "";
    shareModal = new bootstrap.Modal(document.getElementById("shareModal"));
    shareModal.show();
});

document.getElementById('copyLink').addEventListener('click', function () {
    navigator.clipboard.writeText(getLink());
});

document.getElementById('facebook').addEventListener('click', function () {
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + getLink(), '_blank');
});

document.getElementById('x').addEventListener('click', function () {
    window.open('https://x.com/intent/tweet?text=Check out my Body Type!&url=' + getLink(), '_blank');
});

document.getElementById('whatsapp').addEventListener('click', function () {
    window.open('https://api.whatsapp.com/send?text=Check out my Body Type! ' + getLink(), '_blank');
});

function getLink() {
    shareModal.hide();
    return 'https://whatismybodytype.com?id=' + btoa('name=' + nameInput.value.trim() + '&bmi=' + bmiInput.value + '&pbf=' + pbfInput.value);
}