var player1 = prompt("Player 1 : Enter your name, you will be blue.");
var player1Color='blue';

var player2 = prompt("Player 2 : Enter your name, you will be red.");
var player2Color='red';

var game_on=true;
var table=$('table tr');

function reportWin(rowNum,colNum){
	console.log("you won starting at this row, columns :");
	console.log(rowNum);
	console.log(colNum);
}

function changeColor(rowIndex, colIndex, color){
	return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color); 
}
function returnColor(rowIndex, colIndex){
	return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color'); 
}

function checkBottom(colIndex){
	var colorReport = returnColor(5,colIndex);
	for (var row = 5 ; row > -1 ; row--){
		colorReport = returnColor(row,colIndex);
		if(colorReport==='rgb(128,128,128)'){
			return row;
		} 
	}
}

function colorMatchCheck(one,two,three,four){
	return (one===two && one ===three && one===four && one!=='rgb(128,128,128)' && one!==undefined);
}

function horizontalWinCheck(){
	for(var row = 0 ; row < 6 ; row++ ){
		for(var col = 0 ; col < 4 ; col++ ){
			if(colorMatchCheck(returnColor(row,col), returnColor(row, col+1), returnColor(row, col+2), returnColor(row, col+3))){
				console.log('horizontal win yayay');
				reportWin(row,col);
				return true;
			}
			else{
				continue;
			}
		}
	}
}

function VerticalWinCheck(){
	for(var col=0 ; col < 5 ; col++ ){
		for(var row=0 ; row < 4 ; row++ ){
			if(colorMatchCheck(returnColor(row,col), returnColor(row+1, col), returnColor(row+2, col), returnColor(row+3, col))){
				console.log('vertical win yayay');
				reportWin(row,col);
				return true;
			}
			else{
				continue;
			}
		}
	}
}

function DiagonallWinCheck(){
	for(var col = 0 ; col < 5 ; col++ ){
		for(var row = 0 ; row < 7 ; row++ ){
			if (colorMatchCheck(returnColor(row,col), returnColor(row+1, col+1), returnColor(row+2, col+2), returnColor(row+3, col+3))) {
				console.log("DiagonallWin wohoo");
				reportWin(row,col);
				return true;
			}
			else if(colorMatchCheck(returnColor(row,col), returnColor(row-1, col-1), returnColor(row-2, col-2), returnColor(row-3, col-3))){
				console.log("DiagonallWin wohoo");
				reportWin(row,col);
				return true;	
			}
			else{
				continue;
			}
		}
	}
}

var currentPlayer = 1;
var currentName = player1;
var currentColor = player1Color;

$('h3').text(player1+" it is your turn, pick a column to drop in ! ")

$('.board button').click(function(){

	var col = $(this).closest('td').index();
	var bottomAvail = checkBottom(col);
	changeColor(bottomAvail,col,currentColor);

	if (horizontalWinCheck() || VerticalWinCheck() || DiagonallWinCheck() ) {
		$('h1').text(currentName+" You have won !")
		$('h3').fadeOut(2000)
		$('h2').fadeOut(2000)
		
	}

	currentPlayer=currentPlayer*-1;

	if (currentPlayer===1) {
		currentName=player1;
		$('h3').text(currentName+" It is your turn now !")
		currentColor=player1Color;
	}
	else{
		$currentName=player2;
		$('h3').text(currentName+" It is your turn now !")
		currentColor=player2Color;
	}

})












