class Henkilo:
    def __init__(self, nimi: str):
        self.name = nimi
        self.numbers = []
        self.address = None
        
    def lisaa_numero(self, numero: str):
        self.numbers.append(numero)
        
    def lisaa_osoite(self, osoite: str):
        self.address = osoite
    
    def nimi(self):
        return self.name
    
    def numerot(self):
        return self.numbers
    
    def osoite(self):
        return self.address
    
 
class Puhelinluettelo:
    def __init__(self):
        self.__henkilot = {}
 
    def lisaa_numero(self, nimi: str, numero: int):
        if not nimi in self.__henkilot:
            self.__henkilot[nimi] = Henkilo(nimi)
        self.__henkilot[nimi].lisaa_numero(numero)
            
    def lisaa_osoite(self, nimi: str, osoite: str):
        if not nimi in self.__henkilot:
            self.__henkilot[nimi] = Henkilo(nimi)
        self.__henkilot[nimi].lisaa_osoite(osoite)
        
    def hae_tiedot(self, nimi: str):
        if not nimi in self.__henkilot:
            return None
        return self.__henkilot[nimi]
 
    def kaikki_tiedot(self):
        return self.__henkilot
 
class PuhelinluetteloSovellus:
    def __init__(self):
        self.__luettelo = Puhelinluettelo()
 
    def ohje(self):
        print("komennot: ")
        print("0 lopetus")
        print("1 numeron lisäys")
        print("2 haku")
        print("3 osoitteen lisäys")
 
    def numeron_lisays(self):
        nimi = input("nimi: ")
        numero = input("numero: ")
        self.__luettelo.lisaa_numero(nimi, numero)
    
    def osoite_lisays(self):
        nimi = input("nimi: ")
        osoite = input("osoite: ")
        self.__luettelo.lisaa_osoite(nimi, osoite)
 
    def haku(self):
        nimi = input("nimi: ")
        tiedot = self.__luettelo.hae_tiedot(nimi)
        if tiedot == None:
            print("osoite ei tiedossa")
            print("numero ei tiedossa")
            return
        print(f"{tiedot.nimi()}")
        numerot = tiedot.numerot()
        if numerot == []:
            print("numero ei tiedossa")
        else:
            for numba in numerot:
                print(f"{numba}")
        if tiedot.osoite() == None:
            print("osoite ei tiedossa")
            return
        print(f"{tiedot.osoite()}")      
 
    def suorita(self):
        self.ohje()
        while True:
            print("")
            komento = input("komento: ")
            if komento == "0":
                break
            elif komento == "1":
                self.numeron_lisays()
            elif komento == "2":
                self.haku()
            elif komento == "3":
                self.osoite_lisays()
            else:
                self.ohje()
 
sovellus = PuhelinluetteloSovellus()
sovellus.suorita()
