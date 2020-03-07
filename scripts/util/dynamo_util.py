def map_keys(item, keymap):
    for item_key in item.keys():
        item[keymap[item_key]] = item.pop(item_key)
    return item

def clean_map(item):
    for item_key in item.keys():
        if(len(item[item_key])):
            item.pop(item_key)
    return item