import json

class Player:
    def __init__(self,name: str, nationality: str, assists: int, goals: int, penalties: int, team: str, games: int):
        self.name = name
        self.nat = nationality
        self. assists = assists
        self. goals = goals
        self.penalties = penalties
        self.team = team
        self.games = games
        self.points = assists + goals
    
    def __str__(self):
        return f'{self.name:20} {self.team:4} {self.goals:>2} + {self.assists:>2} = {self.points:>3}'
                 
class Funktiot:
    def tiedosto(self, file: str):
        with open(file) as tiedosto:
            data = tiedosto.read()
        return json.loads(data)

    def hae_pelaaja(self, file: str, pelaaja: str):
        info = self.tiedosto(file)
        for player in info:
            if player["name"] == pelaaja:
                player = Player(player["name"], player["nationality"], player["assists"], player["goals"], player["penalties"], player["team"], player["games"])
                return player             

    def joukkueet(self, file: str):
        joukkueet = []
        info = self.tiedosto(file)
        for joukkue in info:
            if not joukkue["team"] in joukkueet:
                joukkueet.append(joukkue["team"])
        return sorted(joukkueet)
    
    def maat(self, file: str):
        maat = []
        info = self.tiedosto(file)
        for maa in info:
            if not maa["nationality"] in maat:
                maat.append(maa["nationality"])
        return sorted(maat)
    
    def joukkueen_pelaajat(self, file: str, joukkue: str):
        pelaajat = []
        info = self.tiedosto(file)
        for player in info:
            if player["team"] == joukkue:
                player = Player(player["name"], player["nationality"], player["assists"], player["goals"], player["penalties"], player["team"], player["games"])
                pelaajat.append(player)
        return pelaajat
    
    def maan_pelaajat(self, file: str, maa: str):
        pelaajat = []
        info = self.tiedosto(file)
        for player in info:
            if player["nationality"] == maa:
                player = Player(player["name"], player["nationality"], player["assists"], player["goals"], player["penalties"], player["team"], player["games"])
                pelaajat.append(player)
        return pelaajat

    def kaikki_pelaajat(self, file: str):
        pelaajat = []
        info = self.tiedosto(file)
        for player in info:
            player = Player(player["name"], player["nationality"], player["assists"], player["goals"], player["penalties"], player["team"], player["games"])
            pelaajat.append(player)
        return pelaajat

class Sovellus:
    def __init__(self):
        self.__nhl = Funktiot()
        
    def help(self):
        print("komennot:")
        print("0 lopeta")
        print("1 hae pelaajat")
        print("2 joukkueet")
        print("3 maat")
        print("4 joukkueen pelaajat")
        print("5 maan pelaajat")
        print("6 eniten pisteitä")
        print("7 eniten maaleja")
    
    def suorita(self):
        file = input("tiedosto:")
        with open(file) as tiedosto:
            data = tiedosto.read()
        tilastot = json.loads(data)
        print(f"luettiin {len(tilastot)} pelaajan tiedot")
        print("")
        self.help()
        while True:
            print("")
            select = input("komento: ")
            if select == "0":
                break
            elif select == "1":
                player = self.__nhl.hae_pelaaja(file, input("nimi: "))
                print(player)
            elif select == "2":
                teams = self.__nhl.joukkueet(file)
                for team in teams:
                    print(team) 
            elif select == "3":
                nationalities = self.__nhl.maat(file)
                for nat in nationalities:
                    print(nat)
            elif select == "4":
                team_players = self.__nhl.joukkueen_pelaajat(file, input("joukkue:"))
                team_players.sort(key= lambda pelaaja: pelaaja.points, reverse=True)
                for player in team_players:
                    print(player) 
            elif select == "5":
                nat_players = self.__nhl.maan_pelaajat(file, input("maa:"))
                nat_players.sort(key=lambda pelaaja: pelaaja.points, reverse=True)
                for player in nat_players:
                    print(player) 
            elif select == "6":
                how_many = int(input("kuinka monta:"))
                players = self.__nhl.kaikki_pelaajat(file)
                players.sort(key=lambda pelaaja: (pelaaja.points, pelaaja.goals), reverse=True)
                for player in range(how_many):
                    print(players[player]) 
            elif select =="7":
                how_many = int(input("kuinka monta:"))
                players = self.__nhl.kaikki_pelaajat(file)
                players.sort(key=lambda pelaaja: (pelaaja.goals, -pelaaja.games), reverse=True)
                for player in range(how_many):
                    print(players[player])

Sovellus().suorita()