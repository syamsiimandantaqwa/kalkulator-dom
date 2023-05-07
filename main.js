// input buttons
const inputBtn = document.querySelectorAll(".input-btn");
const output = document.querySelector(".output-container input")
let input = '';

inputBtn.forEach(btn => {
	btn.addEventListener("click", (e) => {
		input += e.target.textContent;
		output.value = input;

		if(input.length >= 3){
			output.value = formatNumber(input)
		}
	})
})

// operation buttons
const clearBtn = document.querySelector(".clear-btn");
const delBtn = document.querySelector(".del-btn");
const equalBtn = document.querySelector(".equal-btn");
const operatorBtn = document.querySelectorAll(".operator-btn");


clearBtn.onclick = () => {
	input = ""
	output.value = ""
}

delBtn.onclick = () => {
	if(output !== "") {
		const str = output.value.substring(0, output.value.length - 1)

		input = formatNumber(str);
		output.value = input;
	}
}

operatorBtn.forEach(btn => {
	btn.addEventListener("click", (e) => {
		// cek jika input nya kosong dan input tersebut di akhirnya mengandung angka maka boleh masukan operator
		if(input !== "" && /[0-9]+$/.test(input)){
			input += e.target.textContent;
			output.value = formatNumber(input)
		}
	})
})

equalBtn.onclick = () => {
	// cek inputan terlebih dahulu agar tidak kosong
	if(input !== ""){
		// menghapus semua titik dan menimpa (x) dengan (*) agar bisa melakukan kalkulasi
		const data = input.replaceAll(".", "").replaceAll("x", "*")
		const result = eval(data)
		// agar hasilnya terdapat titik di setiap 3 digitnya
		input = result.toLocaleString("id-ID");
		output.value = input;
	}
}

// digunakan untuk memformat angka
function formatNumber(num) {
	// untuk menampung semua angka dan operatornya
	let convertToNumber = [];
	// membuat string menjadi array dan memisahkan semua operatornya sebagai element di array
	const splitAllOperators = num.replaceAll(".", "").match(/[0-9]+|[+-/x]/g);
	splitAllOperators.map(n => {
		// di gunakan untuk mengubah string (angka) ke type data number
		if(/[+-/x]+/g.test(n)){
			convertToNumber.push(n)
		}else {
			const number = parseInt(n)
			convertToNumber.push(number.toLocaleString("id-ID"))
		}
	})
	// mengembalikannya lagi ke sebuah string
	return convertToNumber.join("");
}