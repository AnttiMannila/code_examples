class Kiipeilyreitti:
    def __init__(self, nimi: str, pituus: int, grade: str):
        self.nimi = nimi
        self.pituus = pituus
        self.grade = grade

    def __str__(self):
        return f"{self.nimi}, pituus {self.pituus} metriä, grade {self.grade}"

def pituuden_mukaan(reitit: list):
    def pituudet(reitti: Kiipeilyreitti):
        return reitti.pituus
    return sorted(reitit, key=pituudet, reverse=True)

def vaikeuden_mukaan(reitit: list):
    def vaikeus(reitti: Kiipeilyreitti):
        return reitti.grade, reitti.pituus
    return sorted(reitit, key=vaikeus, reverse=True)
    
