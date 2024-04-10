import pandas as pd
from sqlalchemy import create_engine
import os
import glob
import json 


def read_config(filename):     
    with open(filename, 'r') as file:         
        config = json.load(file)     
        return config 
    # Read the configuration fileconfig = read_config('config.json') 
    # Access passwords and other options db_username = config['database']['username'] db_password = config['database']['password'] api_key = config['api']['key'] 
    # Use passwords and other options in your code
    # For example:print("Database username:", db_username)print("Database password:", db_password)print("API key:", api_key)

database = read_config('.config.json')
user = database['database']['username']
password = database['database']['password']

#create link/engine to database
engine = create_engine(f"postgresql://{user}:{password}@betafinalserver.postgres.database.azure.com/project_db")

def oecd_coutries_to_db():
    '''This function creates table named 'plastic_data_country' from OECD countries to database. Probably useless in this project '''
    #define path to get .csv files
    path = f"{os.getcwd()}\\country"
    files = glob.glob(os.path.join(path,"*.csv"))

    #loop trough folder and make a list from .csv files
    dfs = []
    for file in files:
        df = pd.read_csv(file)
        try:
            df = df.rename(columns={'Entity': 'country_name',
                            'Code': 'country_code',
                            'Year': 'year'})
        except:
            pass
        dfs.append(df)

    #merge all files from list to final_df
    final_df = dfs[0]
    for i in dfs[1:]:
        final_df = pd.merge(final_df, i, on=['country_name', 'country_code', 'year'], how='outer')

    #create .csv and table to db
    final_df.to_csv('Exports_recycling_imports_recycling_manufactured_collected_recycling_incinerated.csv')
    final_df.to_sql('plastic_data_country', engine, if_exists='replace', index=False)

def world_data_to_db():
    '''Create dim_location table to DB and .csv file to folder, Creates also merged world_data_merged.csv file and world_data_by_country table to DB'''
    
    #Define path
    path = f"{os.getcwd()}\\world_data"
    files = glob.glob(os.path.join(path,"*.csv"))

    #loop trough folder and make a list of dataframes from .csv files, renaming columns by using TRY/EXCEPT to tackle errors.
    country_dfs = []
    for file in files:
        df = pd.read_csv(file)
        try:
            df = df.rename(columns={
                'Entity': 'location_name',
                'Code': 'location_code',
                'Year': 'year'
            })
        except:
            pass
        try:
            df = df.rename(columns={
                'oecd_code' : 'location_code',
                'oecd_name': 'location_name'
            })
        except:
            pass
        country_dfs.append(df)
    
    #merging all dataframes on three columns
    final_df = country_dfs[0]
    for i in country_dfs[1:]:
        final_df = pd.merge(final_df, i, on=['location_name', 'location_code', 'year'], how='outer')
    
    #dropping unneeded columns with TRY/EXCEPT for tackling errors
    try:
        final_df = final_df.drop(columns=['Continent', 'Mismanaged plastic waste to ocean per capita (kg per year)'])
    except:
        pass
    
    #list of OECD countries
    oecd_countries = ['Australia',
    'Austria',
    'Belgium',
    'Canada',
    'Chile',
    'Czech Republic',
    'Denmark',
    'Estonia',
    'Finland',
    'France',
    'Germany',
    'Greece',
    'Hungary',
    'Iceland',
    'Ireland',
    'Israel',
    'Italy',
    'Japan',
    'South Korea',
    'Latvia',
    'Lithuania',
    'Luxembourg',
    'Mexico',
    'Netherlands',
    'New Zealand',
    'Norway',
    'Poland',
    'Portugal',
    'Slovakia',
    'Slovenia',
    'Spain',
    'Sweden',
    'Switzerland',
    'Turkey',
    'United Kingdom',
    'United States',
    'Other OECD America',
    'OECD EU',
    'OECD Non-EU',
    'OECD Asia',
    'OECD Oceania']

    #create dataframe df_country, for dim_location table and dim_location.csv file
    df_country = final_df[['location_name', 'location_code']]
    
    #create is_oecd column with False value
    df_country['is_oecd'] = False
    
    #iter rows df_country check that location_name is correct and change it if needed
    for index, row in df_country.iterrows():
        if row['location_name'] == 'Türkiye':
            df_country.at[index, 'location_name'] = 'Turkey'
    
    #dropping dulicates from df_country and switching is_oecd to True if location is OECD country/location
    df_country = df_country.drop_duplicates()
    for index, row in df_country.iterrows():
        if row['location_name'] in oecd_countries:
            df_country.at[index, 'is_oecd'] = True

    #creating index and column location_id
    df_country['location_id'] = range(1,len(df_country) + 1)
    df_country.set_index('location_id', inplace=True)

    #create .csv files and tables, removes indexes, if indexes are needed just remove index=False. ALSO REPLACES TABLES IN DATABASES!!!
    df_country.to_csv('files_for_staging\\dim_location.csv')
    df_country.to_sql('dim_location', engine, if_exists='replace',index=False)
    final_df.to_csv('all_merged\\world_data_merged.csv')
    final_df.to_sql('world_data_by_country', engine, if_exists='replace', index=False)


def create_staging_table():
    '''Creates staging table and dim_value_description tables to database, also creates staging.csv and dim_value_description.csv files  '''
    
    #Define path
    path = f"{os.getcwd()}\\wold_data_with_values"
    files = glob.glob(os.path.join(path,"*.csv"))

    #lists what needed in populating columns
    oecd_countries = ['Australia',
    'Austria',
    'Belgium',
    'Canada',
    'Chile',
    'Czech Republic',
    'Denmark',
    'Estonia',
    'Finland',
    'France',
    'Germany',
    'Greece',
    'Hungary',
    'Iceland',
    'Ireland',
    'Israel',
    'Italy',
    'Japan',
    'South Korea',
    'Latvia',
    'Lithuania',
    'Luxembourg',
    'Mexico',
    'Netherlands',
    'New Zealand',
    'Norway',
    'Poland',
    'Portugal',
    'Slovakia',
    'Slovenia',
    'Spain',
    'Sweden',
    'Switzerland',
    'Turkey',
    'United Kingdom',
    'United States',
    'Other OECD America',
    'OECD EU',
    'OECD Non-EU',
    'OECD Asia',
    'OECD Oceania']

    regions = [
    'Other OECD America',
    'OECD EU',
    'OECD Non-EU',
    'OECD Asia',
    'OECD Oceania',
    'Americas (excl. USA)',
    'Asia (excl. China and India)',
    'Europe',
    'Middle East & North Africa',
    'Oceania',
    'Oceania',
    'World',
    'Other OECD America',
    'OECD EU',
    'OECD Non-EU',
    'OECD Asia',
    'OECD Oceania',
    'European Union',
    'Africa',
    'Central & North America',
    'East Asia and Pacific (WB)',
    'Europe and Central Asia (WB)',
    'Latin America and Caribbean (WB)',
    'Middle East and North Africa (WB)',
    'North America',
    'North America (WB)',
    'Other Africa',
    'Other Asia (not elsewhere specified)',
    'Other EU',
    'Other Eurasia',
    'South America',
    'South Asia (WB)',
    'Sub-Saharan Africa (WB)',
    'World',
    'Ocenia'
    ]

    oceans = [
    'Global ocean',
    'Indian Ocean',
    'Mediterranean Sea',
    'North Atlantic',
    'North Pacific',
    'South Atlantic',
    'South Pacific',
    'Global ocean (total)',]

    rivers = [
    'Amazon (Brazil, Peru, Colombia, Ecuador)',
    'Brantas (Indonesia)',
    'Cross (Nigeria, Cameroon)',
    'Dong (China)',
    'Ganges (India, Bangladesh)',
    'Hanjiang (China)',
    'Huangpu (China)',
    'Imo (Nigeria)',
    'Irrawaddy (Myanmar)',
    'Kwa Ibo (Nigeria)',
    'Magdalena (Colombia)',
    'Mekong (Thailand, Cambodia, Laos, China, Myanmar, Vietnam)',
    'Pasig (Philippines)',
    'Progo (Indonesia)',
    'Serayu (Indonesia)',
    'Solo (Indonesia)',
    'Tamsui (Taiwan)',
    'Xi (China)',
    'Yangtze (China)',
    'Zhujiang (China)'
    ]
  
    income_groups = [
    'High-income countries',
    'Lower-middle-income countries',
    'Low-income countries',
    'Middle-income countries',
    'Upper-middle-income countries',
    ]


    #loop trough folder and make a list of dataframes from .csv files, renaming and dropping columns by using TRY/EXCEPT to tackle errors. 
    dfs = []
    for file in files:
        df = pd.read_csv(file)
        try:
            df = df.rename(columns={
                'Entity': 'location_name',
                'Code': 'location_code',
                'Year': 'year'
            })
        except:
            pass
        
        try:
            df.drop(columns=['Continent'], inplace=True)
        except:
            pass
        try:
            df = df.rename(columns={
                'oecd_code' : 'location_code',
                'oecd_name': 'location_name'
            })
        except:
            pass
        df.drop(columns=['Unnamed: 0'], inplace=True)
        dfs.append(df)
    
    #merge all files from list to final_df
    final_df = dfs[0]
    for i in dfs[1:]:
        final_df = pd.merge(final_df, i, on=['location_name', 'location_code', 'year', 'unit'], how='outer')
    
    #use melt() to create new dataframe melted_df with new columns 'value_description and 'value'. Keep columns location_name and year.
    #use this dataframe to create fact_location table and csv
    melted_df = final_df.melt(id_vars=['location_name', 'location_code', 'year', 'unit'], var_name='value_name', value_name='value')
    melted_df.drop(columns=['location_code'], inplace=True)
  
    #import and merge new dfs to melted_df, also drops not needed columns
    max_df = pd.read_csv('max_data_combined_ready_for_db.csv')
    plastic_bags = pd.read_csv('missing_data_files\\plastic_bag.csv')
    recycling_rate = pd.read_csv('missing_data_files\\recyclingrate.csv')
    melted_df = pd.merge(melted_df, max_df, on=['location_name', 'value_name', 'value', 'year', 'unit'], how='outer')
    recycling_rate = pd.merge(recycling_rate, plastic_bags, on=['year','value_name','location_name','location_type','value', 'unit'], how='outer')
    recycling_rate.drop(columns=['Unnamed: 0_y', 'Unnamed: 0_x'], inplace=True)
    melted_df = pd.merge(melted_df, recycling_rate, on=['year','value_name','location_name','location_type','value', 'unit'], how='outer')
    
    #from melted_df drop rows where 'value' column is null
    melted_df.dropna(subset=['value'], inplace=True)
    melted_df[['location_id', 'location_type_id', 'value_description_id', 'value_description', 'value_unit_id']] = None
    

    #create is_oecd column with False value
    melted_df['is_oecd'] = False
    
    #iter rows df_country check that location_name is correct and change it if needed
    #and switching column is_oecd to True if location is OECD country/location
    #add location_type and fix wrong unit types
    for index, row in melted_df.iterrows():
        if row['location_name'] == 'Türkiye':
            melted_df.at[index, 'location_name'] = 'Turkey'
        if row['location_name'] == 'Slovak Republic':
            melted_df.at[index, 'location_name'] = 'Slovakia'
        if row['location_name'] == 'world':
            melted_df.at[index, 'location_name'] = 'World'
        if row['location_name'] == 'EU-27' or row['location_name'] == 'European Union (27)' :
            melted_df.at[index, 'location_name'] = 'European Union'
        if row['location_name'] == 'Micronesia (country)':
            melted_df.at[index, 'location_name'] = 'Micronesia'
        if row['location_name'] in oecd_countries:
            melted_df.at[index, 'is_oecd'] = True
        if row['location_name'] in oceans:
            melted_df.at[index, 'location_type'] = 'ocean'
        elif row['location_name'] in regions:
            melted_df.at[index, 'location_type'] = 'region'
        elif row['location_name'] in rivers:
            melted_df.at[index, 'location_type'] = 'river'
        elif row['location_name'] in income_groups:
            melted_df.at[index, 'location_type'] = 'income_group'
        else: 
            melted_df.at[index, 'location_type'] = 'country'
        if row['unit'] == 'maybe tons':
            melted_df.at[index, 'unit'] = 'tons (kg)'
       

    #create columns and index 'fact_id' to melted_df
    melted_df['fact_id'] = range(1,len(melted_df) + 1)
    melted_df.set_index('fact_id', inplace=True)
    
    #create dataframe variable_df from melted_df['values_description]. use this dataframe to create dim_value_description table and csv
    variable_df = melted_df[['value_description']]
    
    #drop duplicate values from variable_df
    variable_df = variable_df.drop_duplicates()

    #create index and column 'value_description_id' to variable_df
    variable_df['value_description_id'] =  range(1,len(variable_df) + 1)
    variable_df.set_index('value_description_id', inplace=True)

    #create .csv files and tables, removes index from dim_value_description, if index is needed just remove index=False. ALSO REPLACES TABLES IN DATABASES!!!
    variable_df.to_csv('fact_table\\dim_value_description.csv')
    melted_df.to_csv('fact_table\\staging_unit.csv')
    # variable_df.to_sql('dim_value_description', engine, if_exists='replace', index=False)
    melted_df.to_sql('staging_test_units', engine, if_exists='replace')



if __name__ == "__main__":
    #oecd_coutries_to_db()
    # world_data_to_db()
    create_staging_table()
    # create_staging_table()