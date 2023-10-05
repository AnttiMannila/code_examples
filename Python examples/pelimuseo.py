class Tietokonepeli:
    def __init__(self, nimi: str, julkaisija: str, vuosi: int):
        self.nimi = nimi
        self.julkaisija = julkaisija
        self.vuosi = vuosi

class Pelivarasto:
    def __init__(self):
        self.__pelit = []

    def lisaa_peli(self, peli: Tietokonepeli):
        self.__pelit.append(peli)

    def anna_pelit(self):
        return self.__pelit


class Pelimuseo(Pelivarasto):
    
    def __init__(self):
        super().__init__()
        self.pelimuseo = []
    
    def anna_pelit(self):
        pelit = super().anna_pelit()
        for peli in pelit:
            if peli.vuosi < 1990:
                self.pelimuseo.append(peli)
        return self.pelimuseo
