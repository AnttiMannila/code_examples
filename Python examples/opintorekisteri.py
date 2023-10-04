class Kurssi:
    def __init__(self, nimi: str, arvosana: str, opintopisteet: str):
        self.nimi = nimi
        self.arvosana = arvosana
        self.opintopisteet = opintopisteet

    def lisaa_arvosana(self, grade: int):
        self.arvosana = grade

    
    def __str__(self):
        return f"{self.nimi} ({self.opintopisteet} op) arvosana{self.arvosana}"

class Opintorekisteri:
    def __init__(self):
        self.opinnot = {}
    
    def lista (self):
        return self.opinnot

    def lisaa_kurssi(self):
        nimi = input("anna nimi: ")
        arvosana = input("anna arvosana: ")
        op = input("anna opintopisteet: ")
        
        if not nimi in self.opinnot:
            self.opinnot[nimi] = [arvosana, op]
        for name, points in self.opinnot.items():
            if name == nimi and points[0] < arvosana:
                points[0] = arvosana

    def hae_kurssi(self):
        nimi = input("Anna nimi:")
        if nimi in self.opinnot:
            return nimi
        return None

    def keskiarvo(self):
        i = 0
        arvosanat = 0
        for name, points in self.opinnot.items():
            arvosanat += int(points[0])
            i += 1
        return f"keskiarvo {int(arvosanat)/int(i):.01f}"


    def tilastot(self):
        kurssit =0
        op =0
        
        for name, points in self.opinnot.items():
            op += int(points[1])
            kurssit += 1
        return f"suorituksia {kurssit} kurssilta, yhteensä {op} opintopistettä"

    def arvosanajakauma(self):
        jakauma = {}
        jakauma["5"] = ""
        jakauma["4"] = ""
        jakauma["3"] = ""
        jakauma["2"] = ""
        jakauma["1"] = ""
        i = "x"

        for name, points in self.opinnot.items():
            if str(points[0]) in jakauma:
                jakauma[points[0]] += i
        return jakauma

    def ohje(self):
        print("0 lopettaa")
        print("1 lisäys")
        print("2 haku")
        print("3 tilastot")

    def sovellus(self):
        self.ohje()
        while(True):
            print("")
            valinta = input("komento: ")
            if valinta == "0":
                break
            
            elif valinta == "1":
                self.lisaa_kurssi()
            
            elif valinta == "2":
                opinnot = self.hae_kurssi()
                if opinnot == None:
                    print("ei suoritusta")
                else:
                    for name, points in self.opinnot.items():
                        print(f"{name} ({points[1]} op) arvosana {points[0]} ")
            
            elif valinta == "3":
                opinnot = self.tilastot()
                keskiarvo = self.keskiarvo()
                jakauma = self.arvosanajakauma()
                print(opinnot)
                print(keskiarvo)
                print("arvosanajakauma")
                for avain, arvo in jakauma.items():
                    print(avain + ": " + arvo)
            
            elif valinta == "4":
                tieto = self.lista()
                for nimi, tiedot in tieto.items():
                    print (f"{nimi} {tiedot[0]} {tiedot[1]}")
                

opinnot = Opintorekisteri()
opinnot.sovellus()
    


