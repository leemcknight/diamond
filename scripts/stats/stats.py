import sys 
from os import listdir
from os.path import isfile, join

def process_line(line):
	line_parts = line.split(',')

def process_file(file):
	print("processing {}".format(file))
	with open(file, 'r') as event_file:
		line = event_file.readline()
		process_line(line)

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
