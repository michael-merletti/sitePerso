window.addEventListener('DOMContentLoaded', function () {
    var petitHulk = function () {
        var hulk = {
            animationHulk: [
                {
                    masque: {
                        masqueX: '150px',
                        masqueY: '143px'
                    },
                    sprite: {
                        spriteX: '0px',
                        spriteY: '-160px' //'-180px'
                    }
                    },
                {
                    masque: {
                        masqueX: '150px',
                        masqueY: '143px' //'143px'
                    },
                    sprite: {
                        spriteX: '-197px',
                        spriteY: '-159px' //'-180px'
                    }
                    },
                {
                    masque: {
                        masqueX: '150px',
                        masqueY: '143px' //'143px'
                    },
                    sprite: {
                        spriteX: '-397px',
                        spriteY: '-166px' //'-175px'
                    }
                    },
                {
                    masque: {
                        masqueX: '150px',
                        masqueY: '143px' //'143px'
                    },
                    sprite: {
                        spriteX: '-598px',
                        spriteY: '-166px' //'-170px'
                    }
                    },
                {
                    masque: {
                        masqueX: '150px',
                        masqueY: '143px' //'143px'
                    },
                    sprite: {
                        spriteX: '-797px',
                        spriteY: '-166px' //'-167px'
                    }
                    },
                {
                    masque: {
                        masqueX: '150px',
                        masqueY: '143px' //'143px'
                    },
                    sprite: {
                        spriteX: '-997px',
                        spriteY: '-166px' //'-167px'
                    }
                    },
                {
                    masque: {
                        masqueX: '150px',
                        masqueY: '143px' //'143px'
                    },
                    sprite: {
                        spriteX: '-1197px',
                        spriteY: '-166px' //'-167px'
                    }
                    },
                {
                    masque: {
                        masqueX: '150px',
                        masqueY: '133px' //'143px'
                    },
                    sprite: {
                        spriteX: '-1398px',
                        spriteY: '-176px' //'-167px'
                    }
                    },
                {
                    masque: {
                        masqueX: '150px',
                        masqueY: '133px' //'143px'
                    },
                    sprite: {
                        spriteX: '-1598px',
                        spriteY: '-176px' //'-167px'
                    }
                    },
                {
                    masque: {
                        masqueX: '150px',
                        masqueY: '133px' //'143px'
                    },
                    sprite: {
                        spriteX: '-1798px',
                        spriteY: '-176px' //'-167px'
                    }
                    }
               ]
        }

        window.addEventListener('load', function () {

            var masque = window.document.getElementById('masque1');
            var sprite = window.document.getElementById('sprite');
            masque.style.left = '-200px';
            var animation = function (index) {
                masque.style.width = hulk.animationHulk[index].masque.masqueX;
                masque.style.height = hulk.animationHulk[index].masque.masqueY;
                sprite.style.left = hulk.animationHulk[index].sprite.spriteX;
                sprite.style.top = hulk.animationHulk[index].sprite.spriteY;
                if (parseFloat(masque.style.left) < window.innerWidth) {
                    masque.style.left = parseFloat(masque.style.left) + 10 + 'px';
                } else {
                    masque.style.left = '-200px';
                }
                window.setTimeout(function () {
                    if (hulk.animationHulk[index + 1]) {
                        animation(index + 1);

                    } else {
                        animation(0);
                    }
                }, 100);
            };
            animation(0);
            $('#masque1').draggable();

        })
    }
    petitHulk();
})