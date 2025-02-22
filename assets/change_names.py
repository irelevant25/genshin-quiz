import os

# List of names to check against
names = ['Albedo', 'Alhaitham', 'Aloy', 'Amber', 'Arlecchino', 'Baizhu', 'Barbara', 'Beidou', 'Bennett', 'Candace',
         'Charlotte', 'Chasca', 'Chevreuse', 'Tartaglia', 'Chiori', 'Chongyun', 'Citlali', 'Clorinde', 'Collei', 'Cyno',
         'Dehya', 'Diluc', 'Diona', 'Dori', 'Emilie', 'Eula', 'Faruzan', 'Fischl', 'Freminet', 'Furina', 'Gaming',
         'Ganyu', 'Gorou', 'Hu Tao', 'Arataki Itto', 'Jean', 'Kachina', 'Kaedehara Kazuha', 'Kaeya', 'Kamisato Ayaka',
         'Kamisato Ayato', 'Kaveh', 'Keqing', 'Kinich', 'Kirara', 'Klee', 'Kujou Sara', 'Kuki Shinobu', 'Lan Yan',
         'Layla', 'Lisa', 'Lynette', 'Lyney', 'Mavuika', 'Mika', 'Mona', 'Mualani', 'Nahida', 'Navia', 'Neuvillette',
         'Nilou', 'Ningguang', 'Noelle', 'Ororon', 'Qiqi', 'Raiden Shogun', 'Razor', 'Rosaria', 'Sangonomiya Kokomi',
         'Sayu', 'Sethos', 'Shenhe', 'Shikanoin Heizou', 'Sigewinne', 'Sucrose', 'Thoma', 'Tighnari', 'Venti',
         'Wanderer', 'Wriothesley', 'Xiangling', 'Xianyun', 'Xiao', 'Xilonen', 'Xingqiu', 'Xinyan', 'Yae Miko',
         'Yanfei', 'Yaoyao', 'Yelan', 'Yoimiya', 'Yumemizuki Mizuki', 'Yun Jin', 'Zhongli']

# Folder path to process
folder_path = 'character/icon'  # Replace with your target folder

def rename_files(folder_path, names):
    for filename in os.listdir(folder_path):
        file_path = os.path.join(folder_path, filename)
        
        if os.path.isfile(file_path):
            file_base, file_ext = os.path.splitext(filename)

            for name in names:
                if file_base.lower().startswith(name.lower()):
                    new_filename = f"{name}{file_ext}"
                    new_file_path = os.path.join(folder_path, new_filename)
                    
                    # Rename file if new name is different
                    if file_path != new_file_path:
                        os.rename(file_path, new_file_path)
                        print(f"Renamed '{filename}' to '{new_filename}'")
                    break  # Stop after the first match to avoid multiple renames

# Run the renaming process
rename_files(folder_path, names)
