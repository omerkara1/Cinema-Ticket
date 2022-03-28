// HTML elementleri tanımlama
const container = document.querySelector('.container');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const select = document.getElementById('movie');
const seats = document.querySelectorAll('.seat:not(.reserved)');


// Seçili koltukların indexlerini çekme
getFromLocalStorage();
calculateTotal();

// Koltukların seçimini yapma
container.addEventListener('click', function(e) {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('reserved')) {
        e.target.classList.toggle('selected');
        calculateTotal();
    }
});

select.addEventListener('change', function(e) {
    calculateTotal()
});

// Koltukların toplam fiyatını hesaplama
function calculateTotal() {
    const selectedSeats = container.querySelectorAll('.seat.selected');

    const selectedSeatArr = []
    const seatsArr = []
    
    selectedSeats.forEach(function(seat) {
        selectedSeatArr.push(seat);
    });

    seats.forEach(function(seat) {
        seatsArr.push(seat);
    })

    let selectedSeatIndexs = selectedSeatArr.map(function(seat) {
        return seatsArr.indexOf(seat);
    })

    let selectedSeatCount = container.querySelectorAll('.seat.selected').length;
        count.innerText = selectedSeatCount;
        amount.innerText = selectedSeatCount * select.value;

        saveToLocalStorage(selectedSeatIndexs);
}

// Local Storage'dan seçili koltukları çekme
function getFromLocalStorage() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach(function(seat, index) {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        })
    }


    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if(selectedMovieIndex !== null) {
        select.selectedIndex = selectedMovieIndex;
    }

}
 

// Seçili koltukları Local Stroage'a kaydetme
function saveToLocalStorage(indexs) { 
    localStorage.setItem('selectedSeats', JSON.stringify(indexs));
    localStorage.setItem('selectedMovieIndex', select.selectedIndex);
}
