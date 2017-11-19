window.onload = function()
{
	function chordsGame(width, height)
	{	
		this.stage = 0
		this.bpmList = [60, 80, 100]
		this.startGame = function()
		{
			game.bpm = game.bpmList[game.stage]
			$('#buttons').fadeOut(1000,function()
			{
				$('#buttons').html('')
				const text = document.createElement('p')
				let temps = 1
				text.textContent = temps
				text.id = 'temps'
				text.style.position = 'absolute'
				text.style.left = '50%'
				text.style.top = '50%'
				text.style.transform = 'translate(-50%,-50%)'
				text.style.fontSize = '50px'
				text.style.color = '#fff'
				$('#buttons').append(text)
				setInterval(function()
				{
					temps++
					if(temps > 4)
						temps = 1
					text.textContent = temps
				}, 60000/game.bpm)
			}).fadeIn(5000, function()
			{
				$('#temps').animate({left: 0, top: '100%'}, 5000)
			})
		}
		
		this.setOptions = function()
		{
			$('#buttons').fadeOut(1000).fadeIn(5000)
		}
		
		this.menu = document.createElement('div')
		this.menu.id = 'menu'
		this.menu.style.width = width + 'px'
		this.menu.style.height = height + 'px'
		this.menu.style.background = '#000'
		this.menu.style.margin = 'auto'
		this.menu.style.position = 'absolute'
		this.menu.style.top = '50%'
		this.menu.style.left = '50%'
		this.menu.style.transform = 'translate(-50%,-50%)'
		
		this.title = document.createElement('p')
		this.title.textContent = 'The Chords Game'
		this.title.style.fontSize = '66px'
		this.title.style.color = '#fff'
		this.title.style.textAlign = 'center'
		this.title.style.cursor = 'default'
		this.title.style.userSelect = 'none'
		
		this.buttons = document.createElement('div')
		this.buttons.id = 'buttons'
		this.buttons.style.width = (width/2) + 'px'
		this.buttons.style.height = (height/2) + 'px'
		this.buttons.style.position = 'absolute'
		this.buttons.style.left = '50%'
		this.buttons.style.top = '50%'
		this.buttons.style.transform = 'translate(-50%,-50%)'
		
		this.btnPlay = document.createElement('div')
		this.btnPlay.style.width = '150px'
		this.btnPlay.style.height = '50px'
		this.btnPlay.textContent = 'Jouer'
		this.btnPlay.style.fontSize = '25px'
		this.btnPlay.className = 'btn btn-warning'
		this.btnPlay.style.display = 'block'
		this.btnPlay.style.margin = '50px auto'
		this.btnPlay.style.cursor = 'default'
		this.btnPlay.addEventListener('click', this.startGame)
		
		this.btnOptions = document.createElement('div')
		this.btnOptions.style.width = '150px'
		this.btnOptions.style.height = '50px'
		this.btnOptions.textContent = 'Options'
		this.btnOptions.style.fontSize = '25px'
		this.btnOptions.className = 'btn btn-primary'
		this.btnOptions.style.display = 'block'
		this.btnOptions.style.margin = '50px auto'
		this.btnOptions.style.cursor = 'default'
		this.btnOptions.addEventListener('click', this.setOptions)
		
		this.btnExit = document.createElement('div')
		this.btnExit.style.width = '150px'
		this.btnExit.style.height = '50px'
		this.btnExit.textContent = 'Quitter'
		this.btnExit.style.fontSize = '25px'
		this.btnExit.className = 'btn btn-danger'
		this.btnExit.style.display = 'block'
		this.btnExit.style.margin = 'auto'
		this.btnExit.style.cursor = 'default'
		this.btnExit.addEventListener('click', function()
		{
				window.location.href = 'http://google.com'
		})
		
		this.buttons.appendChild(this.btnPlay)
		this.buttons.appendChild(this.btnOptions)
		this.buttons.appendChild(this.btnExit)
		this.menu.appendChild(this.title)
		this.menu.appendChild(this.buttons)
		document.body.style.background = '#000'
		document.body.style.fontFamily = 'Indie Flower, cursive'
		document.body.appendChild(this.menu)
	}
	
	const game = new chordsGame(800, 700)
}