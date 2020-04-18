import sys

def write_game(buf, id):
    with open('games/' + id + '.dat', 'w') as file:
        file.write(buf)
        file.flush()

def load_file(file):
    buf = ''
    id = ''
    with open(file, 'r') as reader:
        for line in reader.readlines():            
            if line.startswith('id'):
                if len(id) > 0:
                    write_game(buf, id)
                id = line.split(',')[1].strip()
                buf = ''
            buf += line

def main():
    try:
        file = sys.argv[1]
    except IndexError:
        print('usage: split-games play-by-play-file')
    load_file(file)


if __name__ == "__main__":
    main()
