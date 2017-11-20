window.onload = function()
{
	function chordsGame(width, height)
	{	
		this.stage = 0
		this.bpmList = [60, 70]
		this.tonaList = [['C','Dm','Em','F','G','Am','Bdim'],['G','Am','Bm','C','D','Em','F#dim']]
		this.metronome = true
		this.animationEnd = false
		
		this.startGame = function()
		{
			game.tona = game.tonaList[game.stage]
			game.bpm = game.bpmList[game.stage]
			$('#buttons').fadeOut(1000,function()
			{
				$('#buttons').html('')
				const bip = document.querySelector('audio')
				const backgroundList = document.getElementsByClassName(game.stage)
				bip.volume = 0.3
				const chrono = document.createElement('p')
				const chord = document.createElement('p')
				const nextchord = document.createElement('p')
				let temps = 4
				let random = 0
				chrono.textContent = temps
				chrono.id = 'temps'
				chrono.style.position = 'absolute'
				chrono.style.left = '50%'
				chrono.style.top = '50%'
				chrono.style.transform = 'translate(-50%,-50%)'
				chrono.style.fontSize = '50px'
				chrono.style.color = '#fff'
				chrono.style.cursor = 'default'
				chrono.style.userSelect = 'none'
				$('#buttons').append(chrono)
				
				chord.style.position = 'absolute'
				chord.style.left = '50%'
				chord.style.top = '50%'
				chord.style.transform = 'translate(-50%,-50%)'
				chord.style.fontSize = '70px'
				chord.style.color = '#fff'
				chord.style.cursor = 'default'
				chord.style.userSelect = 'none'
				$('#buttons').append(chord)
				
				nextchord.style.position = 'absolute'
				nextchord.style.left = '0%'
				nextchord.style.top = '50%'
				nextchord.style.transform = 'translate(-50%,-50%)'
				nextchord.style.fontSize = '35px'
				nextchord.style.color = '#fff'
				nextchord.style.cursor = 'default'
				nextchord.style.userSelect = 'none'
				$('#buttons').append(nextchord)
				
				setInterval(function()
				{
					if(game.metronome || (!game.metronome && !game.animationEnd))
						bip.play()
					temps++
					if(temps > 4)
					{
						temps = 1
						if(game.animationEnd)
						{
							backgroundList[random].play()
							chord.textContent = game.tona[random]
							const randomMemorize = random
							do
							{
								random = Math.floor(Math.random() * 7)
							}
							while(randomMemorize == random)
							nextchord.textContent = game.tona[random]
						}
					}
					chrono.textContent = temps
				}, 60000/game.bpm)
			}).fadeIn(5000, function()
			{
				$('#temps').animate({left: 0, top: '100%'}, 2500, function()
				{
					game.animationEnd	= true
				})
			})
		}
		
		this.setOptions = function()
		{
			$('#buttons').fadeOut(1000, function()
			{
				$('#buttons').html('')
				const btnDifficulty = document.createElement('div')
				btnDifficulty.id = 'difficulty'
				btnDifficulty.style.width = '150px'
				btnDifficulty.style.height = '50px'
				btnDifficulty.style.fontSize = '25px'
				btnDifficulty.style.display = 'block'
				btnDifficulty.style.margin = '50px auto'
				btnDifficulty.style.cursor = 'default'
				
				switchDifficulty(game.stage)
				
				btnDifficulty.addEventListener('click', function()
				{
					switchDifficulty(btnDifficulty.textContent)
				})
				function switchDifficulty(toSwitch)
				{
					switch(toSwitch)
					{
						case 'Débutant':
						case 1:
							btnDifficulty.textContent = 'Amateur'
							btnDifficulty.className = 'btn btn-primary'
							btnDifficulty.value = 1
							break
						case 'Amateur':
						case 2:
							btnDifficulty.textContent = 'Intermédiaire'
							btnDifficulty.className = 'btn btn-warning'
							btnDifficulty.value = 2
							break
						case 'Intermédiaire':
						case 3:
							btnDifficulty.textContent = 'Pro'
							btnDifficulty.className = 'btn btn-danger'
							btnDifficulty.value = 3
							break
						case 'Pro':
						case 4:
							btnDifficulty.textContent = 'Dieu vivant'
							btnDifficulty.className = 'btn btn-default'
							btnDifficulty.value = 4
							break
						default:
							btnDifficulty.textContent = 'Débutant'
							btnDifficulty.className = 'btn btn-info'
							btnDifficulty.value = 0
					}
				}
				const btnMetronome = document.createElement('div')
				btnMetronome.id = 'btnMetronome'
				btnMetronome.style.width = '150px'
				btnMetronome.style.height = '50px'
				btnMetronome.textContent = 'Metronome'
				btnMetronome.style.fontSize = '25px'
				btnMetronome.style.display = 'block'
				btnMetronome.style.margin = '50px auto'
				btnMetronome.style.cursor = 'default'
				if(game.metronome)
					btnMetronome.className = 'btn btn-success'
				else
					btnMetronome.className = 'btn btn-default'
				btnMetronome.addEventListener('click', function()
				{
					$('#btnMetronome').toggleClass('btn-default').toggleClass('btn-success')
					if(game.metronome)
						game.metronome = false
					else
						game.metronome = true
				})

				const btnBack = document.createElement('div')
				btnBack.style.width = '150px'
				btnBack.style.height = '50px'
				btnBack.textContent = 'Retour'
				btnBack.style.fontSize = '25px'
				btnBack.className = 'btn btn-danger'
				btnBack.style.display = 'block'
				btnBack.style.margin = 'auto'
				btnBack.style.cursor = 'default'
				btnBack.addEventListener('click', function()
				{
					$('#buttons').fadeOut(1000, function()
					{
						const difficultySelected = $('#difficulty').val()
						game.stage = difficultySelected
						$('#menu').remove()
						game.mainMenu()
						$('#buttons').hide()
						$('#buttons').fadeIn(1000)
					})
				})

				game.buttons.appendChild(btnDifficulty)
				game.buttons.appendChild(btnMetronome)
				game.buttons.appendChild(btnBack)
			}).fadeIn(1000)
		}
		
		this.mainMenu = function()
		{
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
			this.btnPlay.className = 'btn btn-success'
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
		
	}
	
	const game = new chordsGame(800, 700)
	game.mainMenu()
}