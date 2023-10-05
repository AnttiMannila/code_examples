class Kiipeilyreitti:
    def __init__(self, nimi: str, pituus: int, grade: str):
        self.nimi = nimi
        self.pituus = pituus
        self.grade = grade

    def __str__(self):
        return f"{self.nimi}, pituus {self.pituus} metriä, grade {self.grade}"

class Kiipeilykallio:
    def __init__(self, nimi: str):
        self.nimi = nimi
        self.__reitit = []

    def lisaa_reitti(self, reitti: Kiipeilyreitti):
        self.__reitit.append(reitti)

    def reitteja(self):
        return len(self.__reitit)

    def vaikein_reitti(self):
        def vaikeuden_mukaan(reitti):
            return reitti.grade

        reitit_jarjestyksessa = sorted(self.__reitit, key=vaikeuden_mukaan)
        return reitit_jarjestyksessa[-1]

    def __str__(self):
        vaikein_reitti = self.vaikein_reitti()
        return f"{self.nimi} {self.reitteja()} reittiä, vaikein {vaikein_reitti.grade}"


def reittien_maaran_mukaan(reitit: list):
    def reittien_maara(paikka : Kiipeilykallio):
        return paikka.reitteja()
    return sorted(reitit, key=reittien_maara)

def vaikeimman_reitin_mukaan(reitit: list):
    def vaikein(paikka : Kiipeilykallio):
        kallio = paikka.vaikein_reitti()
        return kallio.grade
    
    return sorted(reitit, key=vaikein, reverse=True)
    
