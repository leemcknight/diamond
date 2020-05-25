import sys 
from os import listdir
from os.path import isfile, join
from EventEmitter import EventEmitter

emitter = EventEmitter()
fieldstate = {
		'players': {
			'0': {},
			'1': {},
		'runners': {}
	}
}

def start(data):
	player = data[1]
	team = data[3]
	pos = data[5]
	fieldstate['players'][team][pos] = player
	print("start: {}".format(data))
	

def sub(data):
	print("sub: {}".format(data))

def play(data):
	emitter.emit_events(data, fieldstate)

def id(data):
	fieldstate['game_id'] = data[1]

handlers = {
	'play': play,
	'start': start,
	'sub': sub,
	'id': id,
	'info': lambda data : None,
	'version': lambda data : None,
	'data': lambda data: None,
	'com': lambda data: None
}



def update_context(line):
	data = line.split(',')
	context_handlers[data[0]](line)

def process_file(file):
	print("processing {}".format(file))
	with open(file, 'r') as event_file:
		for event_line in event_file:
			data = event_line.split(',')
			print("getting handler for {}".format(data[0]))			
			handlers[data[0]](data)

def process_dir(path):
	onlyfiles = [f for f in listdir(path) if isfile(join(path, f))]
	for event_file in onlyfiles:
		if event_file.endswith('EVA') or event_file.endswith('EVN'):
			process_file(path + '/' + event_file)

def main(): 
	path = sys.argv[1]
	print("processing {}".format(path))
	process_dir(path)

if __name__ == "__main__":
	main()
