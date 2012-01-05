all: show

show: compile
	@echo "Opening..."
	@./build/run.sh

compile: clean
	@echo "Compiling..."
	@./build/compile.sh

clean:
	@echo "Cleaning..."
	@rm -fr template_c

web:
	@open http://gpgtools.org

validate:
	@curl -s "http://validator.w3.org/check?uri=http%3A%2F%2Fwww.gpgtools.org%2F&charset=%28detect+automatically%29&doctype=Inline&group=0"|grep -A2 "Line "||echo

check:
	@echo "Checking..."
	# not html5 compatible, yet
	@/Applications/Validator-SAC.app/Contents/MacOS/Validator-SAC index.html

update:
	@git pull

add-donator: update
	nano templates/donate.tpl; make; git commit -m "added new donator" donate.html templates/donate.tpl; git push
