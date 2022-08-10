using System;
using System.Collections.Generic;
using System.Linq;
using Pit.Help;
using Pit.Process;
using Pit.Types;
using Pit.UI;

namespace Pit.Docker
{
    public class Dockerer : PitAction, IPitActionSync
    {
        public Dockerer(string[] args) : base("Docker", args) { }

        public void Run()
        {
            if (Args.Length > 0 && (Args[0] == "-h" || Args[0] == "--help"))
            {
                ShowHelp();
                return;
            }

            if (Args.Length == 1 && Args[0] == "rm")
            {
                StartContainerClean();
                return;
            }

            if (Args.Length == 1 && Args[0] == "rmi")
            {
                StartImageClean();
                return;
            }

            if (Args.Length == 1 && Args[0] == "rmv")
            {
                StartVolumeClean();
                return;
            }

            HandleUnknownParam();
        }

        private void StartContainerClean()
        {
            const string description = "Select containers to delete:";
            const string listCommand = "docker ps -a --format \"{{.ID}}:{{.Names}}:{{.Status}}\"";
            ProcessRunner runner = new ProcessRunner();
            string listOutput = runner.RunWithDefault(listCommand);
            ContainerResult containers = new ContainerResult(listOutput);
            
            if (containers.Ids.Length == 0)
            {
                Log.Info("No containers found. Quiting...");
                return;
            }
            
            var selectedForDelete = new MultiSelect(description, containers.MenuLines).Show();

            if (selectedForDelete.Count == 0)
            {
                Log.Info("Nothing is selected. Quiting...");
                return;
            }

            var deleteCommand = "docker rm -v ";
            foreach (int index in selectedForDelete)
            {
                Log.Green($"Removing container: {containers.Names[index]}");
                deleteCommand += $"{containers.Ids[index]} ";
            }

            runner.RunWithDefault(deleteCommand);
            Log.Green("Done.");
        }

        private void StartImageClean()
        {
            const string description = "Select images to delete:";
            const string listCommand = "docker images --format \"{{.ID}}:{{.Repository}} @{{.Tag}}:{{.Size}}\"";
            ProcessRunner runner = new ProcessRunner();
            string listOutput = runner.RunWithDefault(listCommand);
            ImageResult images = new ImageResult(listOutput);
            
            if (images.Ids.Length == 0)
            {
                Log.Info("No images found. Quiting...");
                return;
            }
            
            var selectedForDelete = new MultiSelect(description, images.MenuLines).Show();

            if (selectedForDelete.Count == 0)
            {
                Log.Info("Nothing is selected. Quiting...");
                return;
            }

            var deleteCommand = "docker rmi ";
            foreach (int index in selectedForDelete)
            {
                Log.Green($"Removing image: {images.Names[index]}");
                deleteCommand += $"{images.Ids[index]} ";
            }

            runner.RunWithDefault(deleteCommand);
            Log.Green("Done.");
        }

        private void StartVolumeClean()
        {
            const string description = "Select volumes to delete:";
            const string listCommand = "docker volume ls --format \"{{.Name}}\"";
            ProcessRunner runner = new ProcessRunner();
            string listOutput = runner.RunWithDefault(listCommand);
            string[] volumeNames = listOutput
                .Split('\n')
                .Where(s => !string.IsNullOrWhiteSpace(s))
                .Select(s => s.Trim())
                .ToArray();
            
            if (volumeNames.Length == 0)
            {
                Log.Info("No volumes found. Quiting...");
                return;
            }
            
            var selectedForDelete = new MultiSelect(description, volumeNames).Show();

            if (selectedForDelete.Count == 0)
            {
                Log.Info("Nothing is selected. Quiting...");
                return;
            }

            var deleteCommand = "docker volume rm ";
            foreach (int index in selectedForDelete)
            {
                Log.Green($"Removing volume: {volumeNames[index]}");
                deleteCommand += $"{volumeNames[index]} ";
            }

            runner.RunWithDefault(deleteCommand);
            Log.Green("Done.");
        }

        public override void ShowHelp()
        {
            Log.Blue("Usage:");
            Console.WriteLine(HelpText.Docker);
        }
    }
}