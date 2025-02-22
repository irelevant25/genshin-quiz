import os

# Specify the directory and the prefix to remove
folder_path = 'character/icon'  # Replace with your folder path
prefix_to_remove = 'icon_'         # Replace with the prefix you want to remove

# Iterate through files in the directory
for filename in os.listdir(folder_path):
    if os.path.isfile(os.path.join(folder_path, filename)):
        new_name = filename

        # Remove prefix if it exists
        if new_name.startswith(prefix_to_remove):
            new_name = new_name[len(prefix_to_remove):]

        # Remove all underscores and hyphens
        new_name = new_name.replace('_', '').replace('-', ' ')

        # Rename the file if the name has changed
        if new_name != filename:
            old_file = os.path.join(folder_path, filename)
            new_file = os.path.join(folder_path, new_name)
            os.rename(old_file, new_file)
            print(f'Renamed: {filename} -> {new_name}')

print('Prefix, underscores, and hyphens removed.')
