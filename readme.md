# Memória descritiva

Basicamente, fiz uma aplicação interativa de atirar ao alvo em p5.js com a ajuda do Gemini.

Para organizar a coisa, o código começa por criar umas listas para guardar os alvos no ecrã, os efeitos visuais, o rastro do rato e a variável do som. Na função inicial (setup), crio a área de jogo de 800x600 píxeis, escondo o cursor normal do computador e gero logo o primeiro alvo.

No ciclo principal (draw), que corre sem parar, o fundo fica a preto e surge um alvo novo a cada segundo (60 frames). O jogo desenha tudo por camadas: alvos ao fundo, ondas no meio e a mira à frente. Os alvos são feitos com três círculos concêntricos em azul e branco que mudam para vermelho quando passas o rato por cima (para dar aquele destaque visual), e desaparecem automaticamente se passares 1 segundo sem lhes acertar.

Quando clicas no rato (mousePressed), o programa calcula a distância até ao alvo para ver se acertaste. Se acertares, o alvo é eliminado, a mira pisca a branco por um segundo e toca o som de uma gota de água (playWaterDropSound). No sítio do impacto, a função drawEffects faz expandir uma onda circular que vai ficando transparente até sumir. A função drawCrosshair desenha a cruz da mira nas coordenadas do rato e cria aquele rastro suave usando as últimas 20 posições guardadas.

Usei if / else nos sítios onde o jogo tem de escolher obrigatoriamente entre duas opções opostas: em drawTargets(), para apagar o alvo se tiver mais de 1 segundo ou desenhá-lo se ainda estiver válido, e para pôr o alvo vermelho em hover ou mantê-lo azul; e em drawCrosshair(), para pôr a mira branca ao clicar ou vermelha no resto do tempo.

Usei if simples (sem else) para coisas que só acontecem quando uma condição se confirma e não fazem rigorosamente nada nos outros casos — como criar alvos a cada 60 frames, apagar o alvo e tocar o som só quando o clique acerta mesmo na bola, ou limpar da memória os rastros antigos e os efeitos que já ficaram transparentes.

...