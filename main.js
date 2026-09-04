const framework = {
    geometry: {

        "Surfaces": [
            { value: "torusSurface", label: "Torus Surface" },
            { value: "mobiusStrip", label: "Möbius Strip" },
            { value: "torusDoubleHelix", label: "Torus with Double Helix" }
        ],

        "3D Curves": [
            { value: "helix", label: "Helix" },
            { value: "doubleHelix", label: "Double Helix" },
            { value: "doubleHelixBasePairs", label: "DNA Double Helix with Base Pairs" },
            { value: "dnaDoubleHelixSNP", label: "DNA Double Helix with SNP" }
        ],

        "Polyhedra": [
            { value: "tetrahedron", label: "Tetrahedron" },
            { value: "cube", label: "Cube" },
            { value: "octahedron", label: "Octahedron" },
            { value: "icosahedron", label: "Icosahedron" },
            { value: "dodecahedron", label: "Dodecahedron" },
            { value: "sierpinskiIcosahedron", label: "Sierpinski Icosahedron" },
            { value: "sierpinskiIcosahedronScene", label: "Sierpinski Icosahedron with Sphere and Torus" }
        ],

        "Lemniscates": [
            { value: "gerono", label: "Lemniscate of Gerono" },
            { value: "booth", label: "Booth Lemniscate" },
            { value: "bernoulli", label: "Bernoulli Lemniscate" }
        ],

        "Rose Curves": [
            { value: "cosRose", label: "Cosine Rose" },
            { value: "sinRose", label: "Sine Rose" }
        ],

        "Spirals": [
            { value: "archSpiral", label: "Archimedean Spiral" },
            { value: "logSpiral", label: "Logarithmic Spiral" },
            { value: "fermatSpiral", label: "Fermat Spiral" }
        ],

        "Lissajous Curves": [
            { value: "lissajous", label: "Standard Lissajous Curve" },
            { value: "animatedLissajous", label: "Animated Lissajous Curve" }
        ],

        "Cycloids": [
            { value: "cycloid", label: "Cycloid" },
            { value: "epicycloid", label: "Epicycloid" },
            { value: "hypocycloid", label: "Hypocycloid" }
        ],

       "Fibonacci Objects": [
            { value: "fibonacciSpiral", label: "Fibonacci Spiral" },
            { value: "fibonacciTiling", label: "Fibonacci Tiling" }
        ],

        "Fractals": [
            { value: "hilbertCurve", label: "Hilbert Curve" },
            { value: "kochCurve", label: "Koch Curve" },
            { value: "kochSnowflake", label: "Koch Snowflake" },
            { value: "sierpinskiTriangle", label: "Sierpinski Triangle" }
        ],

        "Polyhedral Fractals": [
            { value: "sierpinskiIcosahedron", label: "Sierpinski Icosahedron" }
        ]
    },

    stochastic: {
        "Branching Processes": [
            { value: "galtonWatson", label: "Galton-Watson Tree" },
            { value: "cellBranchingCombined", label: "Biological Cell Branching: Tree + Statistics" },
            { value: "birthDeathProcess", label: "Continuous-Time Birth-Death Process" },
            { value: "birthDeathStats", label: "Birth-Death Extinction Statistics" },
            { value: "birthDeathSamplePaths", label: "Birth-Death Sample Paths" }
        ],
    },

    transformations: {
        "Basic Transformations": [
            { value: "rotate", label: "Rotate" },
            { value: "translate", label: "Translate" },
            { value: "scale", label: "Scale (Dilate)" },
            { value: "reflect", label: "Reflect" }
        ]
    },

    scientificModels: {
        "Pattern Formation": [
            { value: "reactionDiffusion", label: "Reaction-Diffusion Pattern Formation" },
            { value: "diffusionLimitedAggregation", label: "Diffusion-Limited Aggregation" }
        ],

        "Population Genetics": [
            { value: "geneticDrift", label: "Genetic Drift: Frequency Plot" },
            { value: "geneticDriftGrid", label: "Genetic Drift: Grid Population" },
            { value: "geneticDriftBranchingAncestry", label: "Genetic Drift: Branching Ancestry" },
            { value: "geneticDriftBranching", label: "Allele Branching: Galton-Watson" }
        ],

        "Epidemiology": [
            { value: "epidemicBranching", label: "Epidemic Branching Process" }
        ]
    
    }

}

function clearSelect(selectElement) {
    selectElement.innerHTML = "";
}

function addOption(selectElement, value, label) {
    let option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    selectElement.appendChild(option);
}

function buildRoadmap() {
    const roadmapBox = document.getElementById("roadmapBox");

    if (!roadmapBox) {
        return;
    }

    let html = "";

    const categories = Object.keys(framework);

    for (let c = 0; c < categories.length; c++) {
        const categoryKey = categories[c];
        const categoryLabel = formatRoadmapLabel(categoryKey);

        html += '<div class="roadmap-category">' + escapeHTML(categoryLabel) + '</div>';

        const families = Object.keys(framework[categoryKey]);

        for (let f = 0; f < families.length; f++) {
            const familyName = families[f];

            html += '<div class="roadmap-family">' + escapeHTML(familyName) + '</div>';

            const objects = framework[categoryKey][familyName];

            for (let o = 0; o < objects.length; o++) {
                html +=
                    '<button type="button" class="roadmap-object-button" ' +
                    'data-category="' + escapeHTML(categoryKey) + '" ' +
                    'data-family="' + escapeHTML(familyName) + '" ' +
                    'data-object="' + escapeHTML(objects[o].value) + '">' +
                    escapeHTML(objects[o].label) +
                    '</button>';
            }
        }
    }

    roadmapBox.innerHTML = html;

    const buttons = roadmapBox.querySelectorAll(".roadmap-object-button");

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function () {
            selectRoadmapObject(
                this.dataset.category,
                this.dataset.family,
                this.dataset.object
            );
        });
    }
}

function selectRoadmapObject(categoryKey, familyName, objectValue) {
    const categorySelect = document.getElementById("category");
    const familySelect = document.getElementById("family");
    const objectSelect = document.getElementById("objectType");

    if (!categorySelect || !familySelect || !objectSelect) {
        return;
    }

    categorySelect.value = categoryKey;

    updateFamilyOptions();

    familySelect.value = familyName;

    updateObjectOptions();

    objectSelect.value = objectValue;

    updateObjectPanel();
    updateObjectTitle();

    const objectSelectionPanel = document.getElementById("objectSelectionPanel");

    if (objectSelectionPanel) {
        objectSelectionPanel.scrollIntoView({
            behavior: "smooth",
            block: "start"
    });
    }
}

function escapeHTML(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function toggleRoadmap() {
    const roadmapBox = document.getElementById("roadmapBox");

    if (!roadmapBox) {
        return;
    }

    if (roadmapBox.style.display === "none") {
        buildRoadmap();
        roadmapBox.style.display = "block";
    } else {
        roadmapBox.style.display = "none";
    }
}

function formatRoadmapLabel(key) {
    if (key === "geometry") {
        return "Geometry";
    }

    if (key === "stochastic") {
        return "Stochastic";
    }

    if (key === "transformations") {
        return "Transformations";
    }

    if (key === "scientificModels") {
        return "Scientific Models";
    }

    return key;
}

function updateFamilyOptions() {
    let category = document.getElementById("category").value;
    let familySelect = document.getElementById("family");

    clearSelect(familySelect);

    let families = Object.keys(framework[category]);

    for (let i = 0; i < families.length; i++) {
        addOption(familySelect, families[i], families[i]);
    }

    updateObjectOptions();
}

function updateObjectOptions() {
    let category = document.getElementById("category").value;
    let family = document.getElementById("family").value;
    let objectSelect = document.getElementById("objectType");

    clearSelect(objectSelect);

    let objects = framework[category][family];

    for (let i = 0; i < objects.length; i++) {
        addOption(objectSelect, objects[i].value, objects[i].label);
    }

    updateObjectPanel();
}

function updateObjectTitle() {

    let objectSelect = document.getElementById("objectType");
    let title = document.getElementById("objectTitle");

    if (!objectSelect || !title || objectSelect.selectedIndex < 0) {
        return;
    }

    let selectedName = objectSelect.options[objectSelect.selectedIndex].text;

    title.innerHTML = selectedName;
}

function updateObjectPanel() {
    let objectType = document.getElementById("objectType").value;

    document.getElementById("gwExtinctionPanel").style.display = "none";
    document.getElementById("torusSurfacePanel").style.display = "none";
    document.getElementById("geronoPanel").style.display = "none";
    document.getElementById("boothPanel").style.display = "none";
    document.getElementById("galtonWatsonPanel").style.display = "none";
    document.getElementById("bernoulliPanel").style.display = "none";
    document.getElementById("rosePanel").style.display = "none";
    document.getElementById("spiralPanel").style.display = "none";
    document.getElementById("lissajousPanel").style.display = "none";
    document.getElementById("cycloidPanel").style.display = "none";
    document.getElementById("rotatePanel").style.display = "none";
    document.getElementById("translatePanel").style.display = "none";
    document.getElementById("scalePanel").style.display = "none";
    document.getElementById("reflectPanel").style.display = "none";
    document.getElementById("fibonacciPanel").style.display = "none";
    document.getElementById("hilbertPanel").style.display = "none";
    document.getElementById("birthDeathPanel").style.display = "none";
    document.getElementById("birthDeathStatsPanel").style.display = "none";
    document.getElementById("birthDeathSamplePathsPanel").style.display = "none";
    document.getElementById("cellBranchingPanel").style.display = "none";
    document.getElementById("helixPanel").style.display = "none";
    document.getElementById("doubleHelixPanel").style.display = "none";
    document.getElementById("geneticDriftGridPanel").style.display = "none";
    document.getElementById("geneticDriftBranchingPanel").style.display = "none";
    document.getElementById("geneticDriftBranchingAncestryPanel").style.display = "none";
    document.getElementById("epidemicBranchingPanel").style.display = "none";
    document.getElementById("torusDoubleHelixPanel").style.display = "none";
    document.getElementById("mobiusStripPanel").style.display = "none";
    document.getElementById("cellBranchingStatsPanel").style.display = "none";
    document.getElementById("tetrahedronPanel").style.display = "none";
    document.getElementById("cubePanel").style.display = "none";
    document.getElementById("octahedronPanel").style.display = "none";
    document.getElementById("icosahedronPanel").style.display = "none";
    document.getElementById("dodecahedronPanel").style.display = "none";
    document.getElementById("blenderSIPanel").style.display = "none";

    document.getElementById("placeholderPanel").style.display = "none";
    
 if (objectType === "torusSurface") {
        document.getElementById("torusSurfacePanel").style.display = "block";
} else if (objectType === "torusDoubleHelix") {
    document.getElementById("torusDoubleHelixPanel").style.display = "block";
} else if (objectType === "tetrahedron") {
    document.getElementById("tetrahedronPanel").style.display = "block";
} else if (objectType === "cube") {
    document.getElementById("cubePanel").style.display = "block";
} else if (objectType === "octahedron") {
    document.getElementById("octahedronPanel").style.display = "block";
} else if (objectType === "icosahedron") {
    document.getElementById("icosahedronPanel").style.display = "block";
} else if (objectType === "dodecahedron") {
    document.getElementById("dodecahedronPanel").style.display = "block";
} else if (objectType === "mobiusStrip") {
    document.getElementById("mobiusStripPanel").style.display = "block";
} else if (objectType === "epidemicBranching") {
    document.getElementById("epidemicBranchingPanel").style.display = "block";
} else if (objectType === "helix") {
    document.getElementById("helixPanel").style.display = "block";
} else if (
    objectType === "doubleHelix" ||
    objectType === "doubleHelixBasePairs" ||
    objectType === "dnaDoubleHelixSNP"
) {
    document.getElementById("doubleHelixPanel").style.display = "block";
} else if (objectType === "gerono") {
    document.getElementById("geronoPanel").style.display = "block";
} else if (objectType === "booth") {
    document.getElementById("boothPanel").style.display = "block";
} else if (objectType === "galtonWatson") {
    document.getElementById("galtonWatsonPanel").style.display = "block";
} else if (objectType === "cellBranching") {
    document.getElementById("cellBranchingPanel").style.display = "block";
} else if (objectType === "cellBranchingStats") {
    document.getElementById("cellBranchingStatsPanel").style.display = "block";
} else if (objectType === "cellBranchingCombined") {
    document.getElementById("cellBranchingPanel").style.display = "block";
    document.getElementById("cellBranchingStatsPanel").style.display = "block";
} else if (objectType === "gwExtinction") {
    document.getElementById("gwExtinctionPanel").style.display = "block";
} else if (objectType === "bernoulli") {
    document.getElementById("bernoulliPanel").style.display = "block";
    } else if (objectType === "cosRose" || objectType === "sinRose") {
        document.getElementById("rosePanel").style.display = "block";
    } else if (
        objectType === "archSpiral" ||
        objectType === "logSpiral" ||
        objectType === "fermatSpiral"
    ) {
        document.getElementById("spiralPanel").style.display = "block";
    } else if (
        objectType === "lissajous" ||
        objectType === "animatedLissajous"
    ) {
        document.getElementById("lissajousPanel").style.display = "block";
    } else if (
    objectType === "cycloid" ||
    objectType === "epicycloid" ||
    objectType === "hypocycloid"
    ) {
        document.getElementById("cycloidPanel").style.display = "block";
    } else if (objectType === "rotate") {
        document.getElementById("rotatePanel").style.display = "block";
    } else if (objectType === "translate") {
        document.getElementById("translatePanel").style.display = "block";
    } else if (objectType === "scale") {
        document.getElementById("scalePanel").style.display = "block";
    } else if (objectType === "reflect") {
    document.getElementById("reflectPanel").style.display = "block";

    } else if (
        objectType === "fibonacciSpiral" ||
        objectType === "fibonacciTiling"
    ) {
        document.getElementById("fibonacciPanel").style.display = "block";
    } else if (
        objectType === "hilbertCurve" ||
        objectType === "kochCurve" ||
        objectType === "kochSnowflake" ||
        objectType === "sierpinskiTriangle"
    ) {
        document.getElementById("hilbertPanel").style.display = "block";
    } else if (
        objectType === "sierpinskiIcosahedron" ||
        objectType === "sierpinskiIcosahedronScene"
    ) {
        document.getElementById("blenderSIPanel").style.display = "block";
    } else if (objectType === "birthDeathProcess") {
        document.getElementById("birthDeathPanel").style.display = "block";
    } else if (objectType === "birthDeathStats") {
        document.getElementById("birthDeathStatsPanel").style.display = "block";
    } else if (objectType === "birthDeathSamplePaths") {
        document.getElementById("birthDeathSamplePathsPanel").style.display = "block";
        } else if (objectType === "reactionDiffusion") {
            // No special input panel yet.
        } else if (objectType === "diffusionLimitedAggregation") {
            // No special input panel yet.
        } else if (objectType === "geneticDrift") {
            // No special input panel yet.
    } else if (objectType === "geneticDriftGrid") {
        generateGeoGebraGeneticDriftGrid();
    } else if (objectType === "geneticDriftBranchingAncestry") {
         generateGeoGebraGeneticDriftBranchingAncestry();
    } else if (objectType === "geneticDriftBranching") {
        generateGeoGebraGeneticDriftBranching();
    } else {
        document.getElementById("placeholderPanel").style.display = "block";
    }

    updateDescription();
    updateFormula();
    updateDemo();
    updatePreviews();
}

function generateCode() {
    let objectType = document.getElementById("objectType").value;

    if (objectType === "torusSurface") {
        generateGeoGebraTorusSurface();
    } else if (objectType === "torusDoubleHelix") {
        generateGeoGebraTorusDoubleHelix();
    } else if (objectType === "tetrahedron") {
        generateGeoGebraTetrahedron();
    } else if (objectType === "tetrahedron") {
        generateGeoGebraTetrahedron();
    } else if (objectType === "cube") {
        generateGeoGebraCube();
    } else if (objectType === "octahedron") {
        generateGeoGebraOctahedron();
    } else if (objectType === "icosahedron") {
        generateGeoGebraIcosahedron();
    } else if (objectType === "dodecahedron") {
        generateGeoGebraDodecahedron();
    } else if (objectType === "mobiusStrip") {
        generateGeoGebraMobiusStrip();
    } else if (objectType === "helix") {
        generateGeoGebraHelix();
    } else if (objectType === "doubleHelix") {
        generateGeoGebraDoubleHelix();
    } else if (objectType === "doubleHelixBasePairs") {
        generateDoubleHelixBasePairs();
    } else if (objectType === "dnaDoubleHelixSNP") {
        generateDNADoubleHelixSNP();
    } else if (objectType === "gerono") {
        generateGeoGebraGerono();
    } else if (objectType === "booth") {
        generateGeoGebraBooth();
    } else if (objectType === "galtonWatson") {
        generateGeoGebraGaltonWatson();
    } else if (objectType === "cellBranching") {
        generateGeoGebraCellBranching();
    } else if (objectType === "cellBranchingStats") {
        generateGeoGebraCellBranchingStats();
    } else if (objectType === "cellBranchingCombined") {
        generateGeoGebraCellBranchingCombined();
    } else if (objectType === "gwExtinction") {
        generateGWExtinctionAnalysis();
    } else if (objectType === "bernoulli") {
        generateGeoGebraBernoulli();
    } else if (objectType === "cosRose") {
        generateGeoGebraRose("cos");
    } else if (objectType === "sinRose") {
        generateGeoGebraRose("sin");
    } else if (objectType === "archSpiral") {
        generateGeoGebraSpiral("arch");
    } else if (objectType === "logSpiral") {
        generateGeoGebraSpiral("log");
    } else if (objectType === "fermatSpiral") {
        generateGeoGebraSpiral("fermat");
    } else if (objectType === "lissajous") {
        generateGeoGebraLissajous();
    } else if (objectType === "animatedLissajous") {
        generateGeoGebraAnimatedLissajous();
    } else if (objectType === "cycloid") {
        generateGeoGebraCycloid("cycloid");
    } else if (objectType === "epicycloid") {
        generateGeoGebraCycloid("epi");
    } else if (objectType === "hypocycloid") {
        generateGeoGebraCycloid("hypo");
    } else if (objectType === "rotate") {
        generateGeoGebraRotate();
    } else if (objectType === "translate") {
        generateGeoGebraTranslate();
    } else if (objectType === "scale") {
        generateGeoGebraScale();
    } else if (objectType === "reflect") {
        generateGeoGebraReflect();
    } else if (objectType === "fibonacciSpiral") {
        generateGeoGebraFibonacciSpiral();
    } else if (objectType === "fibonacciTiling") {
        generateGeoGebraFibonacciTiling();
    } else if (objectType === "hilbertCurve") {
        generateGeoGebraHilbertCurve();
    } else if (objectType === "kochCurve") {
        generateGeoGebraKochCurve();
    } else if (objectType === "kochSnowflake") {
        generateGeoGebraKochSnowflake();
    } else if (objectType === "sierpinskiTriangle") {
        generateGeoGebraSierpinskiTriangle();
    } else if (
        objectType === "sierpinskiIcosahedron" ||
        objectType === "sierpinskiIcosahedronScene"
    ) {
        generateGeoGebraSierpinskiIcosahedron();
    } else if (objectType === "birthDeathProcess") {
        generateGeoGebraBirthDeathProcess();
    } else if (objectType === "birthDeathStats") {
        generateGeoGebraBirthDeathStats();
    } else if (objectType === "birthDeathSamplePaths") {
        generateGeoGebraBirthDeathSamplePaths();
    } else if (objectType === "reactionDiffusion") {
        generateGeoGebraReactionDiffusion();
    } else if (objectType === "diffusionLimitedAggregation") {
        generateGeoGebraDiffusionLimitedAggregation();
    } else if (objectType === "epidemicBranching") {
        generateGeoGebraEpidemicBranching();
    } else if (objectType === "geneticDrift") {
        generateGeoGebraGeneticDrift();
    } else if (objectType === "geneticDriftGrid") {
        generateGeoGebraGeneticDriftGrid();
    } else if (objectType === "geneticDriftBranchingAncestry") {
        generateGeoGebraGeneticDriftBranchingAncestry();
    } else if (objectType === "geneticDriftBranching") {
        generateGeoGebraGeneticDriftBranching();
    } else {
        setOutputs("Generator not yet implemented for this object.");
    }
    showVMFPage("codePage");
}


window.onload = function() {
    updateFamilyOptions();
    buildRoadmap();
};



function generateGeoGebraGerono() {
    let name = document.getElementById("geronoName").value;
    let a = document.getElementById("geronoScale").value;
    let t = document.getElementById("geronoParam").value;
    let start = document.getElementById("geronoStart").value;
    let end = document.getElementById("geronoEnd").value;

    let code =
`${name} = Curve(${a} cos(${t}), ${a} sin(${t}) cos(${t}), ${t}, 0, 2*pi)`;

    setOutputs(code);
}

function copyOutputToClipboard() {
    let output = document.getElementById("ggbOutput");

    output.select();
    output.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(output.value);
}

function generateGeoGebraBooth() {
    let name = document.getElementById("boothName").value;
    let a = document.getElementById("boothScale").value;
    let t = document.getElementById("boothParam").value;
    let start = document.getElementById("boothStart").value;
    let end = document.getElementById("boothEnd").value;

    let code =
`${name} = Curve((${a} sin(${t})) / (1 + cos(${t})^2), (${a} sin(${t}) cos(${t})) / (1 + cos(${t})^2), ${t}, ${start}, ${end})`;

    setOutputs(code);
}

function generateGeoGebraGaltonWatson() {

    let p = document.getElementById("gwP").value;
    let g = document.getElementById("gwG").value;
    let r = document.getElementById("gwR").value;
    let ang = document.getElementById("gwAng").value;
    let jitter = document.getElementById("gwJitter").value;
    let maxBranches = document.getElementById("gwMaxBranches").value;

let instructions =
`// Galton-Watson Tree uses GeoGebra Global JavaScript.
//
// Paste the JavaScript code from the GeoGebra Global JavaScript panel
// into GeoGebra's Global JavaScript section.
//
// Use the GeoGebra Button Setup panel for the required button calls.
//
// Recommended use:
//
// 1. Run setupGWControls();
// 2. Show the created GeoGebra values as sliders if needed.
// 3. Suggested slider settings:
//
// gwP: 0 to 1, increment 0.01
// gwGenerations: 1 to 12, increment 1
// gwLengthFactor: 0.4 to 0.9, increment 0.05
// gwAngle: 5 to 60, increment 1
// gwJitter: 0 to 30, increment 1
// gwMaxBranches: 50 to 2000, increment 50
//
// 4. Run buildGW();
// 5. Change the sliders.
// 6. Run buildGW() again.
//
// The initial values are taken from the framework input boxes above.
//
// Note:
// Larger p and larger generation values can create many branches.
// If GeoGebra slows down, reduce gwGenerations or gwMaxBranches.`;

let buttonInstructions =
`Create these GeoGebra buttons.

Button label:
Setup GW controls

On Click JavaScript:
setupGWControls();

Button label:
Build GW tree

On Click JavaScript:
buildGW();
`;

    let code =
`// GeoGebra Global JavaScript
// Galton-Watson branching tree with live GeoGebra controls

var GW = {
    objects: [],
    branchCount: 0,
    reachedFinalGeneration: 0,

    p: ${p},
    generations: ${g},
    lengthFactor: ${r},
    angle: ${ang},
    jitter: ${jitter},
    maxBranches: ${maxBranches}
};

function setupGWControls() {

    if (!ggbApplet.exists("gwP")) {
        ggbApplet.evalCommand("gwP = ${p}");
        ggbApplet.setLabelVisible("gwP", true);
    }

    if (!ggbApplet.exists("gwGenerations")) {
        ggbApplet.evalCommand("gwGenerations = ${g}");
        ggbApplet.setLabelVisible("gwGenerations", true);
    }

    if (!ggbApplet.exists("gwLengthFactor")) {
        ggbApplet.evalCommand("gwLengthFactor = ${r}");
        ggbApplet.setLabelVisible("gwLengthFactor", true);
    }

    if (!ggbApplet.exists("gwAngle")) {
        ggbApplet.evalCommand("gwAngle = ${ang}");
        ggbApplet.setLabelVisible("gwAngle", true);
    }

    if (!ggbApplet.exists("gwJitter")) {
        ggbApplet.evalCommand("gwJitter = ${jitter}");
        ggbApplet.setLabelVisible("gwJitter", true);
    }

    if (!ggbApplet.exists("gwMaxBranches")) {
        ggbApplet.evalCommand("gwMaxBranches = ${maxBranches}");
        ggbApplet.setLabelVisible("gwMaxBranches", true);
    }

    alert(
        "Galton-Watson controls created.\\\\n\\\\n" +
        "If GeoGebra does not show them as sliders, make these objects visible manually.\\\\n\\\\n" +
        "Suggested settings:\\\\n\\\\n" +
        "gwP: 0 to 1, increment 0.01\\\\n" +
        "gwGenerations: 1 to 12, increment 1\\\\n" +
        "gwLengthFactor: 0.4 to 0.9, increment 0.05\\\\n" +
        "gwAngle: 5 to 60, increment 1\\\\n" +
        "gwJitter: 0 to 30, increment 1\\\\n" +
        "gwMaxBranches: 50 to 2000, increment 50"
    );
}

function readGWControls() {

    if (!ggbApplet.exists("gwP")) {
        ggbApplet.evalCommand("gwP = ${p}");
    }

    if (!ggbApplet.exists("gwGenerations")) {
        ggbApplet.evalCommand("gwGenerations = ${g}");
    }

    if (!ggbApplet.exists("gwLengthFactor")) {
        ggbApplet.evalCommand("gwLengthFactor = ${r}");
    }

    if (!ggbApplet.exists("gwAngle")) {
        ggbApplet.evalCommand("gwAngle = ${ang}");
    }

    if (!ggbApplet.exists("gwJitter")) {
        ggbApplet.evalCommand("gwJitter = ${jitter}");
    }

    if (!ggbApplet.exists("gwMaxBranches")) {
        ggbApplet.evalCommand("gwMaxBranches = ${maxBranches}");
    }

    GW.p = ggbApplet.getValue("gwP");
    GW.generations = Math.round(ggbApplet.getValue("gwGenerations"));
    GW.lengthFactor = ggbApplet.getValue("gwLengthFactor");
    GW.angle = ggbApplet.getValue("gwAngle");
    GW.jitter = ggbApplet.getValue("gwJitter");
    GW.maxBranches = Math.round(ggbApplet.getValue("gwMaxBranches"));

    if (GW.p < 0) {
        GW.p = 0;
    }

    if (GW.p > 1) {
        GW.p = 1;
    }

    if (GW.generations < 1) {
        GW.generations = 1;
    }

    if (GW.generations > 15) {
        alert("gwGenerations is large. Using 15 instead.");
        GW.generations = 15;
    }

    if (GW.lengthFactor <= 0) {
        GW.lengthFactor = ${r};
    }

    if (GW.maxBranches < 1) {
        GW.maxBranches = 1;
    }
}

function clearGW() {

    for (var i = ggbApplet.getObjectNumber() - 1; i >= 0; i--) {
        var obj = ggbApplet.getObjectName(i);

        if (obj.indexOf("GW_B_") === 0) {
            try {
                ggbApplet.deleteObject(obj);
            } catch(e) {}
        }
    }

    GW.objects = [];
    GW.branchCount = 0;
    GW.reachedFinalGeneration = 0;
}

function randomBetween(a, b) {
    return a + Math.random() * (b - a);
}

function degreesToRadians(deg) {
    return deg * Math.PI / 180;
}

function drawBranch(x1, y1, x2, y2, generation) {

    if (GW.branchCount >= GW.maxBranches) {
        return;
    }

    var name = "GW_B_" + GW.branchCount;

    var cmd = name + " = Segment((" +
        x1 + "," + y1 + "),(" +
        x2 + "," + y2 + "))";

    var beforeNames = {};

    for (var b = 0; b < ggbApplet.getObjectNumber(); b++) {
        beforeNames[ggbApplet.getObjectName(b)] = true;
    }

    ggbApplet.evalCommand(cmd);

    var red = Math.min(255, 40 + generation * 22);
    var green = Math.max(50, 180 - generation * 8);
    var blue = Math.max(80, 230 - generation * 12);

    for (var k = 0; k < ggbApplet.getObjectNumber(); k++) {
        try {
            var obj = ggbApplet.getObjectName(k);

            if (!beforeNames[obj]) {
                ggbApplet.setLabelVisible(obj, false);
                ggbApplet.setColor(obj, red, green, blue);
                ggbApplet.setLineThickness(obj, Math.max(2, 6 - generation * 0.25));
            }
        } catch(e) {}
    }

    try {
        ggbApplet.setLabelVisible(name, false);
        ggbApplet.setColor(name, red, green, blue);
        ggbApplet.setLineThickness(name, Math.max(2, 6 - generation * 0.25));
    } catch(e) {}

    GW.objects.push(name);
    GW.branchCount++;
}

function makeBinaryOffspring(p) {

    var children = [];

    if (Math.random() < p) {
        children.push("L");
    }

    if (Math.random() < p) {
        children.push("R");
    }

    return children;
}

function growGW(x, y, length, angle, generation) {

    if (generation > GW.generations) {
        return;
    }

    if (GW.branchCount >= GW.maxBranches) {
        return;
    }

    if (generation === GW.generations) {
        GW.reachedFinalGeneration = 1;
    }

    var children = makeBinaryOffspring(GW.p);

    for (var i = 0; i < children.length; i++) {

        var baseAngle;

        if (children[i] === "L") {
            baseAngle = angle + degreesToRadians(GW.angle);
        } else {
            baseAngle = angle - degreesToRadians(GW.angle);
        }

        var randomError =
            degreesToRadians(randomBetween(-GW.jitter, GW.jitter));

        var childAngle = baseAngle + randomError;

        var x2 = x + length * Math.cos(childAngle);
        var y2 = y + length * Math.sin(childAngle);

        drawBranch(x, y, x2, y2, generation);

        growGW(
            x2,
            y2,
            length * GW.lengthFactor,
            childAngle,
            generation + 1
        );
    }
}

function setGWNumber(name, value) {

    if (!ggbApplet.exists(name)) {
        ggbApplet.evalCommand(name + " = " + value);
    } else {
        ggbApplet.evalCommand("SetValue(" + name + ", " + value + ")");
    }

    try {
        ggbApplet.setLabelVisible(name, false);
    } catch(e) {}
}

function setGWText(name, value) {

    if (!ggbApplet.exists(name)) {
        ggbApplet.evalCommand(name + " = \\"" + value + "\\"");
    } else {
        ggbApplet.evalCommand("SetValue(" + name + ", \\"" + value + "\\")");
    }

    try {
        ggbApplet.setLabelVisible(name, false);
    } catch(e) {}
}

function buildGW() {

    readGWControls();
    clearGW();

    var startX = 0;
    var startY = 0;
    var startLength = 4;
    var startAngle = Math.PI / 2;

    growGW(
        startX,
        startY,
        startLength,
        startAngle,
        1
    );

    var meanOffspring = 2 * GW.p;
    var survived = GW.reachedFinalGeneration;
    var extinctEarly = 1 - survived;

    setGWNumber("GWTotalBranches", GW.branchCount);
    setGWNumber("GWMeanOffspring", Number(meanOffspring.toFixed(2)));
    setGWNumber("GWFinalGenerationReached", GW.reachedFinalGeneration);

    if (GW.reachedFinalGeneration === 1) {
        setGWText("GWReachedFinalText", "yes");
    } else {
        setGWText("GWReachedFinalText", "no");
    }

    setGWNumber("GWSurvived", survived);
    setGWNumber("GWExtinctEarly", extinctEarly);

    setGWNumber("GWCurrentP", GW.p);
    setGWNumber("GWCurrentGenerations", GW.generations);
    setGWNumber("GWCurrentLengthFactor", GW.lengthFactor);
    setGWNumber("GWCurrentAngle", GW.angle);
    setGWNumber("GWCurrentJitter", GW.jitter);
    setGWNumber("GWCurrentMaxBranches", GW.maxBranches);
}`;

    setOutputs(instructions, code, "", buttonInstructions);
}


function generateGeoGebraCellBranching() {

    let p0 = document.getElementById("cellP0").value;
    let p2 = document.getElementById("cellP2").value;
    let g = document.getElementById("cellG").value;
    let r = document.getElementById("cellR").value;
    let ang = document.getElementById("cellAng").value;
    let jitter = document.getElementById("cellJitter").value;
    let maxBranches = document.getElementById("cellMaxBranches").value;

    let instructions =
`// Biological Cell Branching uses GeoGebra Global JavaScript.
//
// Paste the JavaScript code from the GeoGebra Global JavaScript panel
// into GeoGebra's Global JavaScript section.
//
// Use the GeoGebra Button Setup panel for the required button calls.
//
// Recommended use:
//
// 1. Run setupCellBranchingControls();
// 2. Show the created GeoGebra values as sliders if needed.
// 3. Suggested slider settings:
//
// cellP0: 0 to 1, increment 0.01
// cellP2: 0 to 1, increment 0.01
// cellGenerations: 1 to 12, increment 1
// cellLengthFactor: 0.4 to 0.9, increment 0.05
// cellAngle: 5 to 60, increment 1
// cellJitter: 0 to 30, increment 1
// cellMaxBranches: 50 to 2000, increment 50
//
// 4. Run buildCellBranching();
// 5. Change the sliders.
// 6. Run buildCellBranching() again.
//
// Important:
// cellP0 + cellP2 must be less than or equal to 1.
//
// The remaining probability is:
//
// cellP1 = 1 - cellP0 - cellP2
//
// where:
// cellP0 = death probability
// cellP1 = quiescence / one-child probability
// cellP2 = proliferation / two-child probability.`;

    let code =
`// GeoGebra Global JavaScript
// Biological Cell Branching with live GeoGebra controls

var CellB = {
    objects: [],
    branchCount: 0,
    deathCount: 0,
    reachedFinalGeneration: 0,

    p0: ${p0},
    p1: 1 - ${p0} - ${p2},
    p2: ${p2},

    generations: ${g},
    lengthFactor: ${r},
    angle: ${ang},
    jitter: ${jitter},
    maxBranches: ${maxBranches}
};


function setupCellBranchingControls() {

    if (!ggbApplet.exists("cellP0")) {
        ggbApplet.evalCommand("cellP0 = ${p0}");
        ggbApplet.setLabelVisible("cellP0", true);
    }

    if (!ggbApplet.exists("cellP2")) {
        ggbApplet.evalCommand("cellP2 = ${p2}");
        ggbApplet.setLabelVisible("cellP2", true);
    }

    if (!ggbApplet.exists("cellGenerations")) {
        ggbApplet.evalCommand("cellGenerations = ${g}");
        ggbApplet.setLabelVisible("cellGenerations", true);
    }

    if (!ggbApplet.exists("cellLengthFactor")) {
        ggbApplet.evalCommand("cellLengthFactor = ${r}");
        ggbApplet.setLabelVisible("cellLengthFactor", true);
    }

    if (!ggbApplet.exists("cellAngle")) {
        ggbApplet.evalCommand("cellAngle = ${ang}");
        ggbApplet.setLabelVisible("cellAngle", true);
    }

    if (!ggbApplet.exists("cellJitter")) {
        ggbApplet.evalCommand("cellJitter = ${jitter}");
        ggbApplet.setLabelVisible("cellJitter", true);
    }

    if (!ggbApplet.exists("cellMaxBranches")) {
        ggbApplet.evalCommand("cellMaxBranches = ${maxBranches}");
        ggbApplet.setLabelVisible("cellMaxBranches", true);
    }

    alert(
        "Biological Cell Branching controls created.\\n\\n" +
        "If GeoGebra does not show them as sliders, make these objects visible manually.\\n\\n" +
        "Suggested settings:\\n\\n" +
        "cellP0: 0 to 1, increment 0.01\\n" +
        "cellP2: 0 to 1, increment 0.01\\n" +
        "cellGenerations: 1 to 12, increment 1\\n" +
        "cellLengthFactor: 0.4 to 0.9, increment 0.05\\n" +
        "cellAngle: 5 to 60, increment 1\\n" +
        "cellJitter: 0 to 30, increment 1\\n" +
        "cellMaxBranches: 50 to 2000, increment 50\\n\\n" +
        "Important: cellP0 + cellP2 must be less than or equal to 1."
    );
}

function readCellBranchingControls() {

    if (!ggbApplet.exists("cellP0")) {
        ggbApplet.evalCommand("cellP0 = ${p0}");
    }

    if (!ggbApplet.exists("cellP2")) {
        ggbApplet.evalCommand("cellP2 = ${p2}");
    }

    if (!ggbApplet.exists("cellGenerations")) {
        ggbApplet.evalCommand("cellGenerations = ${g}");
    }

    if (!ggbApplet.exists("cellLengthFactor")) {
        ggbApplet.evalCommand("cellLengthFactor = ${r}");
    }

    if (!ggbApplet.exists("cellAngle")) {
        ggbApplet.evalCommand("cellAngle = ${ang}");
    }

    if (!ggbApplet.exists("cellJitter")) {
        ggbApplet.evalCommand("cellJitter = ${jitter}");
    }

    if (!ggbApplet.exists("cellMaxBranches")) {
        ggbApplet.evalCommand("cellMaxBranches = ${maxBranches}");
    }

    CellB.p0 = ggbApplet.getValue("cellP0");
    CellB.p2 = ggbApplet.getValue("cellP2");

    if (CellB.p0 < 0) {
        CellB.p0 = 0;
    }

    if (CellB.p2 < 0) {
        CellB.p2 = 0;
    }

    if (CellB.p0 > 1) {
        CellB.p0 = 1;
    }

    if (CellB.p2 > 1) {
        CellB.p2 = 1;
    }

    CellB.p1 = 1 - CellB.p0 - CellB.p2;

    if (CellB.p1 < 0) {
        alert(
            "Invalid probabilities.\\n\\n" +
            "cellP0 + cellP2 must be less than or equal to 1.\\n\\n" +
            "Current values give cellP1 = " + CellB.p1.toFixed(3)
        );
        return false;
    }

    CellB.generations = Math.round(ggbApplet.getValue("cellGenerations"));
    CellB.lengthFactor = ggbApplet.getValue("cellLengthFactor");
    CellB.angle = ggbApplet.getValue("cellAngle");
    CellB.jitter = ggbApplet.getValue("cellJitter");
    CellB.maxBranches = Math.round(ggbApplet.getValue("cellMaxBranches"));

    if (CellB.generations < 1) {
        CellB.generations = 1;
    }

    if (CellB.generations > 15) {
        alert("cellGenerations is large. Using 15 instead.");
        CellB.generations = 15;
    }

    if (CellB.lengthFactor <= 0) {
        CellB.lengthFactor = ${r};
    }

    if (CellB.maxBranches < 1) {
        CellB.maxBranches = 1;
    }

    return true;
}

function clearCellBranching() {

    for (var i = ggbApplet.getObjectNumber() - 1; i >= 0; i--) {
        var obj = ggbApplet.getObjectName(i);

        if (obj.indexOf("CB_B_") === 0 ||
            obj.indexOf("CB_D_") === 0) {
            try {
                ggbApplet.deleteObject(obj);
            } catch(e) {}
        }
    }

    CellB.objects = [];
    CellB.branchCount = 0;
    CellB.deathCount = 0;
    CellB.reachedFinalGeneration = 0;
}

function randomBetween(a, b) {
    return a + Math.random() * (b - a);
}

function degreesToRadians(deg) {
    return deg * Math.PI / 180;
}

function drawCellBranch(x1, y1, x2, y2, generation, fate) {

    if (CellB.branchCount >= CellB.maxBranches) {
        return;
    }

    var name = "CB_B_" + CellB.branchCount;

    var cmd = name + " = Segment((" +
        x1 + "," + y1 + "),(" +
        x2 + "," + y2 + "))";

    var beforeNames = {};

    for (var b = 0; b < ggbApplet.getObjectNumber(); b++) {
        beforeNames[ggbApplet.getObjectName(b)] = true;
    }

    ggbApplet.evalCommand(cmd);

    var red;
    var green;
    var blue;

    if (fate === "quiescence") {
        red = 40;
        green = 150;
        blue = 220;
    } else if (fate === "proliferation") {
        red = Math.min(255, 80 + generation * 20);
        green = Math.max(60, 170 - generation * 10);
        blue = Math.max(60, 180 - generation * 12);
    } else {
        red = 120;
        green = 120;
        blue = 120;
    }

    for (var k = 0; k < ggbApplet.getObjectNumber(); k++) {
        try {
            var obj = ggbApplet.getObjectName(k);

            if (!beforeNames[obj]) {
                ggbApplet.setLabelVisible(obj, false);
                ggbApplet.setColor(obj, red, green, blue);
                ggbApplet.setLineThickness(obj, Math.max(2, 6 - generation * 0.25));
            }
        } catch(e) {}
    }

    try {
        ggbApplet.setLabelVisible(name, false);
        ggbApplet.setColor(name, red, green, blue);
        ggbApplet.setLineThickness(name, Math.max(2, 6 - generation * 0.25));
    } catch(e) {}

    CellB.objects.push(name);
    CellB.branchCount++;
}

function markCellDeath(x, y) {

    var name = "CB_D_" + CellB.deathCount;

    ggbApplet.evalCommand(
        name + " = (" + x + "," + y + ")"
    );

    try {
        ggbApplet.setColor(name, 120, 120, 120);
        ggbApplet.setPointSize(name, 4);
        ggbApplet.setLabelVisible(name, false);
    } catch(e) {}

    CellB.deathCount++;
}

function chooseCellFate() {

    var u = Math.random();

    if (u < CellB.p0) {
        return "death";
    }

    if (u < CellB.p0 + CellB.p1) {
        return "quiescence";
    }

    return "proliferation";
}

function growCellBranching(x, y, length, angle, generation) {

    if (generation > CellB.generations) {
        return;
    }

    if (CellB.branchCount >= CellB.maxBranches) {
        return;
    }

    if (generation === CellB.generations) {
        CellB.reachedFinalGeneration = 1;
    }

    var fate = chooseCellFate();

    if (fate === "death") {
        markCellDeath(x, y);
        return;
    }

    if (fate === "quiescence") {

        var randomError =
            degreesToRadians(randomBetween(-CellB.jitter, CellB.jitter));

        var childAngle = angle + randomError;

        var x2 = x + length * Math.cos(childAngle);
        var y2 = y + length * Math.sin(childAngle);

        drawCellBranch(x, y, x2, y2, generation, "quiescence");

        growCellBranching(
            x2,
            y2,
            length * CellB.lengthFactor,
            childAngle,
            generation + 1
        );

        return;
    }

    if (fate === "proliferation") {

        var leftAngle =
            angle + degreesToRadians(CellB.angle) +
            degreesToRadians(randomBetween(-CellB.jitter, CellB.jitter));

        var rightAngle =
            angle - degreesToRadians(CellB.angle) +
            degreesToRadians(randomBetween(-CellB.jitter, CellB.jitter));

        var xL = x + length * Math.cos(leftAngle);
        var yL = y + length * Math.sin(leftAngle);

        var xR = x + length * Math.cos(rightAngle);
        var yR = y + length * Math.sin(rightAngle);

        drawCellBranch(x, y, xL, yL, generation, "proliferation");
        drawCellBranch(x, y, xR, yR, generation, "proliferation");

        growCellBranching(
            xL,
            yL,
            length * CellB.lengthFactor,
            leftAngle,
            generation + 1
        );

        growCellBranching(
            xR,
            yR,
            length * CellB.lengthFactor,
            rightAngle,
            generation + 1
        );
    }
}

function setCellNumber(name, value) {

    if (!ggbApplet.exists(name)) {
        ggbApplet.evalCommand(name + " = " + value);
    } else {
        ggbApplet.evalCommand("SetValue(" + name + ", " + value + ")");
    }

    try {
        ggbApplet.setLabelVisible(name, false);
    } catch(e) {}
}

function setCellText(name, value) {

    if (!ggbApplet.exists(name)) {
        ggbApplet.evalCommand(name + " = \\"" + value + "\\"");
    } else {
        ggbApplet.evalCommand("SetValue(" + name + ", \\"" + value + "\\")");
    }

    try {
        ggbApplet.setLabelVisible(name, false);
    } catch(e) {}
}

function buildCellBranching() {

    var ok = readCellBranchingControls();

    if (!ok) {
        return;
    }

    clearCellBranching();

    var startX = 0;
    var startY = 0;
    var startLength = 4;
    var startAngle = Math.PI / 2;

    growCellBranching(
        startX,
        startY,
        startLength,
        startAngle,
        1
    );

    var meanOffspring = CellB.p1 + 2 * CellB.p2;
    var survived = CellB.reachedFinalGeneration;
    var extinctEarly = 1 - survived;

    setCellNumber("CellTotalBranches", CellB.branchCount);
    setCellNumber("CellDeaths", CellB.deathCount);
    setCellNumber("CellDeathProbability", Number(CellB.p0.toFixed(2)));
    setCellNumber("CellQuiescenceProbability", Number(CellB.p1.toFixed(2)));
    setCellNumber("CellProliferationProbability", Number(CellB.p2.toFixed(2)));
    setCellNumber("CellMeanOffspring", Number(meanOffspring.toFixed(2)));
    setCellNumber("CellFinalGenerationReached", CellB.reachedFinalGeneration);

    if (CellB.reachedFinalGeneration === 1) {
        setCellText("CellReachedFinalText", "yes");
    } else {
        setCellText("CellReachedFinalText", "no");
    }

    setCellNumber("CellSurvived", survived);
    setCellNumber("CellExtinctEarly", extinctEarly);

    setCellNumber("CellCurrentP0", CellB.p0);
    setCellNumber("CellCurrentP1", CellB.p1);
    setCellNumber("CellCurrentP2", CellB.p2);
    setCellNumber("CellCurrentGenerations", CellB.generations);
    setCellNumber("CellCurrentLengthFactor", CellB.lengthFactor);
    setCellNumber("CellCurrentAngle", CellB.angle);
    setCellNumber("CellCurrentJitter", CellB.jitter);
    setCellNumber("CellCurrentMaxBranches", CellB.maxBranches);
}`;

let buttonInstructions =
`Create these GeoGebra buttons.

Button label:
Generate cell branching tree

On Click JavaScript:
buildCellBranching()

Button label:
Clear tree

On Click JavaScript:
clearCellBranching();
`;

    setOutputs(instructions, code, "", buttonInstructions);
}

function generateGWExtinctionAnalysis() {

    let p = document.getElementById("gwExtP").value;
    let g = document.getElementById("gwExtG").value;
    let trials = document.getElementById("gwTrials").value;

    let instructions =
`// Galton-Watson Extinction Analysis uses GeoGebra Global JavaScript.
//
// Paste the JavaScript code from the GeoGebra Global JavaScript panel
// into GeoGebra's Global JavaScript section.
//
// Use the GeoGebra Button Setup panel for the required button calls.`;

    let code =
`// Galton-Watson Extinction Statistics
// Paste this into GeoGebra Global JavaScript.
// Then create a button whose JavaScript is:
// runGWStatistics();

function runGWStatistics() {

    var p = ${p};
    var generations = ${g};
    var trials = ${trials};

    var extinctCount = 0;

    for (var trial = 0; trial < trials; trial++) {

        var population = 1;

        for (var gen = 1; gen <= generations; gen++) {

            var nextPopulation = 0;

            for (var i = 0; i < population; i++) {

                if (Math.random() < p) {
                    nextPopulation++;
                }

                if (Math.random() < p) {
                    nextPopulation++;
                }
            }

            population = nextPopulation;

            if (population === 0) {
                break;
            }
        }

        if (population === 0) {
            extinctCount++;
        }
    }

    var extinctionRate = extinctCount / trials;
    var survivalRate = 1 - extinctionRate;

    ggbApplet.evalCommand("GWTrials = " + trials);
    ggbApplet.evalCommand("GWExtinctCount = " + extinctCount);
    ggbApplet.evalCommand("GWExtinctionRate = " + extinctionRate);
    ggbApplet.evalCommand("GWSurvivalRate = " + survivalRate);
}`;
    const buttonInstructions =
`Create these GeoGebra buttons.

Button label:
Run extinction analysis

On Click JavaScript:
runGWStatistics();

Button label:
Clear

On Click JavaScript:
clearGW();
`;

    setOutputs(instructions, code, "", buttonInstructions);
}

function generateGeoGebraBernoulli() {
    let name = document.getElementById("bernoulliName").value;
    let a = document.getElementById("bernoulliScale").value;
    let t = document.getElementById("bernoulliParam").value;
    let start = document.getElementById("bernoulliStart").value;
    let end = document.getElementById("bernoulliEnd").value;

    let code =
`${name} = Curve((${a} cos(${t})) / (1 + sin(${t})^2), (${a} sin(${t}) cos(${t})) / (1 + sin(${t})^2), ${t}, ${start}, ${end})`;

    setOutputs(code);
}


function updateDescription() {

    let objectType =
        document.getElementById("objectType").value;

    let text = "";
    let formula = "";

    switch(objectType) {

        
        case "torusSurface":
            text =
                "A torus (doughnut-shaped surface) defined by major radius R and tube radius r.";
            break;

        case "torusDoubleHelix":
            text =
        "A decorative mathematical object: a torus whose tube is wrapped by a double helix. It combines the torus surface with two phase-shifted helical curves and connecting rungs.";
        break;

        case "tetrahedron":
            text =
            "A tetrahedron is the simplest Platonic solid, with 4 triangular faces, 4 vertices, and 6 edges.";
        break;

        case "cube":
            text =
            "A cube is a Platonic solid with 6 square faces, 8 vertices, and 12 edges.";
        break;

        case "octahedron":
            text =
            "An octahedron is a Platonic solid with 8 triangular faces, 6 vertices, and 12 edges.";
        break;

        case "icosahedron":
            text =
            "An icosahedron is a Platonic solid with 20 triangular faces, 12 vertices, and 30 edges.";
        break;

        case "dodecahedron":
            text =
            "A dodecahedron is a Platonic solid with 12 pentagonal faces, 20 vertices, and 30 edges.";
        break;

        case "mobiusStrip":
            text =
        "A Möbius strip is a one-sided surface formed by giving a strip a half-twist before joining its ends.";
        break;

        case "helix":
        text = "A three-dimensional spiral curve winding around an axis. The radius controls the width of the spiral, while the pitch controls how quickly it rises.";
            break;

        case "doubleHelix":
            text =
                "A pair of three-dimensional helical curves winding around the same axis, phase-shifted by pi. This gives the basic double-helix form.";
            break;

        case "doubleHelixBasePairs":
            text =
                "A simplified DNA-style double helix with cross-rungs representing base-pair connections between the two helical strands.";
            break;

        case "dnaDoubleHelixSNP":
        text = "A simplified DNA double helix with one highlighted SNP site. The two coloured helical strands represent DNA strands, grey rungs represent base-pair positions, and one yellow rung marks a selected single-nucleotide polymorphism.";
            break;

        case "geneticDriftGrid":
        text = "A square grid of red and blue circles represents a finite population with two allele types. Each new generation is formed by random sampling from the colour frequencies of the previous generation, similar to drawing marbles from a jar. Over time, random fluctuations may cause one colour to become fixed.";
        break;

        case "geneticDriftBranchingAncestry":
        text = "A fixed-size ancestry model related to branching processes. Each next-generation allele copy randomly samples one source allele copy from the previous generation and inherits its colour. Some source copies leave no descendants, while others leave several, producing genetic drift.";
        break;

        case "epidemicBranching":
        text =
        "An epidemic branching-process model. One infected case can infect several contacts, and each possible transmission happens by chance. The model shows how an outbreak may die out quickly or grow across generations.";
        break;

        case "gerono":
            text =
                "The Lemniscate of Gerono is a figure-8 curve often used as a simple parametric lemniscate.";
            break;

        case "booth":
            text =
                "The Booth Lemniscate is a rational figure-8 curve and a member of the lemniscate family.";
            break;

        case "bernoulli":
            text =
                "The Bernoulli Lemniscate is the classical infinity-shaped curve defined from Cassini ovals.";
            break;

        case "galtonWatson":
            text =
                "A stochastic branching process used to study population growth and extinction.";
            break;

        case "reactionDiffusion":
        text =
        "A reaction-diffusion pattern-formation model. Two quantities spread across a grid while reacting locally, producing spots, mazes, stripes, and other organised patterns from a small disturbance.";
        break;

        case "cellBranching":
            text =
        "A biological branching model in which each cell may die, remain quiescent, or proliferate into two daughter cells.";
        break;

        case "cellBranchingStats":
            text =
        "Runs many Biological Cell Branching trials and estimates extinction, survival, and final population statistics.";
        break;

        case "cellBranchingCombined":
        text =
        "A combined biological branching-process demonstration. It builds a visible cell-branching tree and also runs repeated-trial statistics, allowing the visual tree and extinction/growth behaviour to be compared in one model.";
        break;

        case "gwExtinction":
            text =
                "Runs many Galton-Watson trials and estimates extinction probability.";
            break;

        case "cosRose":
            text =
                "A rose curve with polar form r = a cos(kθ), producing petal-like symmetry.";
            break;

        case "sinRose":
            text =
                "A rose curve with polar form r = a sin(kθ), producing a rotated petal pattern.";
            break;
        case "archSpiral":
            text =
                "An Archimedean spiral whose distance from the origin increases linearly with angle.";
            break;

        case "logSpiral":
            text =
                "A logarithmic spiral whose distance from the origin grows exponentially with angle.";
        break;

        case "fermatSpiral":
            text =
                "A Fermat spiral whose radius grows with the square root of the parameter.";
        break;
        case "lissajous":
            text =
                "A Lissajous curve generated by combining two perpendicular harmonic motions.";
        break;
        case "animatedLissajous":
            text =
                "An animated Lissajous curve in which the phase shift changes continuously.";
         break;
        case "cycloid":
            text =
                "A cycloid is traced by a point on a circle rolling along a straight line.";
        break;

        case "epicycloid":
            text =
                "An epicycloid is traced by a point on a circle rolling around the outside of another circle.";
        break;

        case "hypocycloid":
            text =
                "A hypocycloid is traced by a point on a circle rolling inside another circle.";
        break;

        case "rotate":
            text =
                "Rotates an existing GeoGebra object about a specified pivot point.";
        break;

        case "translate":
            text = "Moves an existing GeoGebra object by a vector.";
        break;

        case "scale":
            text = "Dilates an existing GeoGebra object by a scale factor about a centre point.";
        break;

        case "reflect":
            text = "Reflects an existing GeoGebra object in a line or point.";
        break;

        case "fibonacciSpiral":
            text =
            "A spiral whose growth approximates the expansion pattern associated with Fibonacci numbers and the golden ratio.";
        break;

        case "fibonacciTiling":
            text =
            "A tiling made from squares whose side lengths follow the Fibonacci sequence.";
        break;

        case "hilbertCurve":
            text =
                "A recursive space-filling curve that increasingly fills a square as its order rises.";
        break;

        case "kochCurve":
            text =
             "A recursive fractal curve formed by repeatedly replacing each line segment with four smaller segments.";
        break;

        case "kochSnowflake":
            text =
        "A closed fractal curve formed by applying the Koch construction to the three sides of an equilateral triangle.";
        break;

        case "sierpinskiTriangle":
            text =
                "A recursive fractal made by repeatedly subdividing an equilateral triangle into smaller triangles.";
        break;

        case "sierpinskiIcosahedron":
        text = "A regular icosahedron whose triangular faces are decorated with Sierpinski-style recursive triangle patterns. It combines polyhedral geometry with fractal subdivision.";
        break;

        case "sierpinskiIcosahedronScene":
            text = "A Blender scene based on a Sierpinski-style icosahedral structure, with spherical vertices, connecting edges, a central sphere, and an added torus for visual structure and rotation.";
        break;

        case "birthDeathProcess":
        text =
        "A continuous-time birth-death branching process. The population changes through random birth and death events, producing a step-like sample path over time.";
        break;

        case "birthDeathStats":
            text =
            "Runs the continuous-time birth-death process many times and estimates extinction and survival statistics.";
        break;

        case "birthDeathSamplePaths":
        text =
        "Several continuous-time birth-death sample paths plotted together. Each path shows one possible random population history under the same birth and death rates.";
        break;

        case "reactionDiffusion":
            text = 
    "A simple reaction-diffusion model showing how local chemical reaction plus spatial diffusion can create visible patterns such as spots, stripes, rings, or maze-like structures.";
        break;

        case "diffusionLimitedAggregation":
    text = "Diffusion-Limited Aggregation models particles drifting randomly through a surrounding medium. When a particle touches a seed or the growing deposit, it may attach permanently. Repeating this process can produce branching or compact structures similar to mineral growth, electrodeposition, frost, or coral-like accretion.";
        break;

        case "geneticDrift":
    text = "Genetic drift models random changes in allele frequency from one generation to the next. In a finite population, chance sampling alone can cause an allele to disappear, become fixed, or wander unpredictably over time.";
        break;

        case "geneticDriftBranchingAncestry":
        formula = "Each offspring allele copy chooses one source allele copy at random from the previous generation. Descendant counts are random but constrained to sum to the fixed population size.";
        break;

        case "geneticDriftBranching":
            formula = "A Galton-Watson-style allele branching model in which each lineage has a random number of descendants. The total lineage size may grow, shrink, or become extinct.";
        break;

        default:
            text = "";
    }

    document.getElementById(
        "descriptionBox"
    ).innerHTML = text;
}

function updateDemo() {
    // Legacy function retained during transition to updatePreviews().
    // The new dual-preview system is handled by updatePreviews().
}

function updatePreviews() {
    const objectType = document.getElementById("objectType").value;

    const geoGebraPreviewBox = document.getElementById("geoGebraPreviewBox");
    const blenderPreviewBox = document.getElementById("blenderPreviewBox");

    if (!geoGebraPreviewBox || !blenderPreviewBox) {
        return;
    }

    let geoGebraPreview = "<p>GeoGebra preview not yet available.</p>";
    let blenderPreview = "<p>Blender preview not yet available.</p>";

    switch (objectType) {

         case "gerono":
            geoGebraPreview =
                '<img src="image/gerono.png" alt="GeoGebra Lemniscate of Gerono preview">';
            blenderPreview =
                "<p>Blender preview not yet available for this object.</p>";
        break;

        case "booth":
            geoGebraPreview =
                '<img src="image/booth.png" alt="GeoGebra Booth lemniscate preview">';
            blenderPreview =
                "<p>Blender preview not yet available for this object.</p>";
            
        break;

         case "bernoulli":
            geoGebraPreview =
                '<img src="image/bernoulli.png" alt="GeoGebra Bernoulli lemniscate preview">';
            blenderPreview =
                "<p>Blender preview not yet available for this object.</p>";
        break;

        case "cosRose":
            geoGebraPreview =
                '<img src="image/cosRose.png" alt="GeoGebra cosine rose preview">';
            blenderPreview =
                "<p>Blender preview not yet available for this object.</p>";
        break;

        case "sinRose":
            geoGebraPreview =
                '<img src="image/sinRose.png" alt="GeoGebra sine rose preview">';
            blenderPreview =
                "<p>Blender preview not yet available for this object.</p>";
        break;

         case "torusSurface":
            geoGebraPreview =
                '<img src="image/torus.png" alt="GeoGebra torus surface preview">';
            blenderPreview =
                "<p>Blender preview not yet available for this object.</p>";
        break;

        case "torusDoubleHelix":
            geoGebraPreview =
                '<img src="media/torusDoubleHelix_geogebra.png" alt="GeoGebra torus with double helix preview">';
            blenderPreview =
                '<img src="media/torusDoubleHelix_blender.png" alt="Blender torus with double helix preview">';
        break;

        case "tetrahedron":
            geoGebraPreview =
                '<img src="media/tetrahedron.png" alt="GeoGebra tetrahedron preview">';
            blenderPreview =
                "<p>Blender preview not yet available for this object.</p>";
            break;

         case "cube":
            geoGebraPreview =
                '<img src="media/cube.png" alt="GeoGebra cube preview">';
            blenderPreview =
                "<p>Blender preview not yet available for this object.</p>";
            break;

        case "octahedron":
            geoGebraPreview =
                '<img src="media/octahedron.png" alt="GeoGebra octahedron preview">';
            blenderPreview =
                "<p>Blender preview not yet available for this object.</p>";
            break;

        case "icosahedron":
            geoGebraPreview =
                '<img src="media/icosahedron.png" alt="GeoGebra icosahedron preview">';
            blenderPreview =
                "<p>Blender preview not yet available for this object.</p>";
            break;

        case "dodecahedron":
            geoGebraPreview =
                '<img src="media/dodecahedron.png" alt="GeoGebra dodecahedron preview">';
            blenderPreview =
                "<p>Blender preview not yet available for this object.</p>";
            break;

            case "mobiusStrip":
            geoGebraPreview =
                '<img src="media/mobiusStrip.png" alt="GeoGebra Mobius strip preview">';
            blenderPreview =
                "<p>Blender preview not yet available for this object.</p>";
            break;

         case "helix":
            geoGebraPreview =
                '<img src="media/helix.png" alt="GeoGebra helix preview">';
            blenderPreview =
                "<p>Blender preview not yet available for this object.</p>";
            break;

            case "doubleHelix":
            geoGebraPreview =
                '<img src="media/doubleHelix.png" alt="GeoGebra double helix preview">';
            blenderPreview =
                "<p>Blender preview not yet available for this object.</p>";
            break;

            case "doubleHelixBasePairs":
            geoGebraPreview =
                '<img src="media/doubleHelixBasePairs.png" alt="GeoGebra DNA double helix with base pairs preview">';
            blenderPreview =
                '<img src="media/doubleHelixBasePairs_blender.png" alt="Blender DNA double helix with base pairs preview">';
            break;

            case "dnaDoubleHelixSNP":
                geoGebraPreview = '<img src="media/dnaDoubleHelixSNP_geogebra.png" alt="GeoGebra DNA Double Helix with SNP preview">';
                blenderPreview = '<img src="media/dnaDoubleHelixSNP_blender.png" alt="Blender DNA Double Helix with SNP preview">';
            break;

            case "hilbertCurve":
                geoGebraPreview =
                '<img src="media/hilbertCurve.png" alt="GeoGebra Hilbert curve preview">';
                blenderPreview =
                "<p>Blender preview not yet available for this object.</p>";
            break;

            case "kochCurve":
                geoGebraPreview =
                '<img src="media/kochCurve.png" alt="GeoGebra Koch curve preview">';
                blenderPreview =
                "<p>Blender preview not yet available for this object.</p>";
            break;

            case "kochSnowflake":
                geoGebraPreview =
                '<img src="media/kochSnowflake.png" alt="GeoGebra Koch snowflake preview">';
                blenderPreview =
                "<p>Blender preview not yet available for this object.</p>";
            break;

            case "sierpinskiTriangle":
                geoGebraPreview =
                '<img src="media/sierpinskiTriangle.png" alt="GeoGebra Sierpinski triangle preview">';
                blenderPreview =
                "<p>Blender preview not yet available for this object.</p>";
            break;

            case "sierpinskiIcosahedron":
                geoGebraPreview =
                '<img src="media/sierpinskiIcosahedron.png" alt="GeoGebra Sierpinski Icosahedron preview">';
                blenderPreview =
                '<img src="media/sierpinskiIcosahedron_blender.png" alt="Blender Sierpinski Icosahedron preview">';
            break;

            case "sierpinskiIcosahedronScene":
                geoGebraPreview =
                '<img src="media/sierpinskiIcosahedron.png" alt="GeoGebra Sierpinski Icosahedron preview">';
                blenderPreview =
                '<img src="media/blender_SI_with_Sphere_and_Torus.png" alt="Blender Sierpinski Icosahedron with sphere and torus preview">';
            break;

                case "archSpiral":
            geoGebraPreview =
                '<img src="media/archSpiral.png" alt="GeoGebra Archimedean spiral preview">';
            blenderPreview =
                "<p>Blender preview not yet available for this object.</p>";
            break;

        case "logSpiral":
            geoGebraPreview =
                '<img src="media/logSpiral.png" alt="GeoGebra logarithmic spiral preview">';
            blenderPreview =
                "<p>Blender preview not yet available for this object.</p>";
            break;

        case "fermatSpiral":
            geoGebraPreview =
                '<img src="media/fermatSpiral.png" alt="GeoGebra Fermat spiral preview">';
            blenderPreview =
                "<p>Blender preview not yet available for this object.</p>";
            break;

        case "cycloid":
            geoGebraPreview =
                '<img src="media/cycloid.png" alt="GeoGebra cycloid preview">';
            blenderPreview =
                "<p>Blender preview not yet available for this object.</p>";
            break;

        case "epicycloid":
            geoGebraPreview =
                '<img src="media/epicycloid.png" alt="GeoGebra epicycloid preview">';
            blenderPreview =
                "<p>Blender preview not yet available for this object.</p>";
            break;

        case "hypocycloid":
            geoGebraPreview =
                '<img src="media/hypocycloid.png" alt="GeoGebra hypocycloid preview">';
            blenderPreview =
                "<p>Blender preview not yet available for this object.</p>";
            break;

        case "lissajous":
            geoGebraPreview =
                '<img src="media/lissajous.png" alt="GeoGebra Lissajous curve preview">';
            blenderPreview =
                "<p>Blender preview not yet available for this object.</p>";
            break;

        case "animatedLissajous":
            geoGebraPreview =
                '<img src="media/animatedLissajous.png" alt="GeoGebra animated Lissajous curve preview">';
            blenderPreview =
                "<p>Blender preview not yet available for this object.</p>";
            break;

        case "fibonacciSpiral":
            geoGebraPreview =
                '<img src="media/fibonacciSpiralWithSquares.png" alt="GeoGebra Fibonacci spiral preview">';
            blenderPreview =
                "<p>Blender preview not yet available for this object.</p>";
            break;

        case "fibonacciTiling":
            geoGebraPreview =
                '<img src="media/fibonacciTiling.png" alt="GeoGebra Fibonacci tiling preview">';
            blenderPreview =
                "<p>Blender preview not yet available for this object.</p>";
            break;

        case "birthDeathProcess":
            geoGebraPreview =
                '<img src="media/birthDeathProcess.png" alt="GeoGebra continuous-time birth-death process preview">';
            blenderPreview =
                "<p>Blender preview not yet available for this object.</p>";
            break;

        case "birthDeathStats":
            geoGebraPreview =
                '<img src="media/birthDeathExtinctionStats.png" alt="GeoGebra birth-death extinction statistics preview">';
            blenderPreview =
                "<p>Blender preview not yet available for this object.</p>";
            break;

        case "birthDeathSamplePaths":
            geoGebraPreview =
                '<img src="media/birthDeathSamplePaths.png" alt="GeoGebra birth-death sample paths preview">';
            blenderPreview =
                "<p>Blender preview not yet available for this object.</p>";
            break;

         case "galtonWatson":
            geoGebraPreview =
                '<img src="media/galtonWatsonTree.png" alt="GeoGebra Galton-Watson tree preview">';
            blenderPreview =
                "<p>Blender preview not yet available for this object.</p>";
            break;

        case "cellBranching":
            geoGebraPreview =
                '<img src="media/biologicalCellBranchingLive.png" alt="GeoGebra biological cell branching preview">';
            blenderPreview =
                "<p>Blender preview not yet available for this object.</p>";
            break;

        case "cellBranchingStats":
            geoGebraPreview =
                '<img src="media/biologicalCellBranchingStats.png" alt="GeoGebra biological cell branching statistics preview">';
            blenderPreview =
                "<p>Blender preview not yet available for this object.</p>";
            break;

        case "cellBranchingCombined":
            geoGebraPreview =
                '<img src="media/biologicalCellBranchingWithStats.png" alt="GeoGebra biological cell branching with statistics preview">';
            blenderPreview =
                "<p>Blender preview not yet available for this object.</p>";
            break;

                case "reactionDiffusion":
            geoGebraPreview =
                '<img src="media/reactionDiffusion.png" alt="GeoGebra reaction-diffusion preview">';
            blenderPreview =
                "<p>Blender preview not yet available for this object.</p>";
            break;

        case "diffusionLimitedAggregation":
            geoGebraPreview =
                '<img src="media/diffusionLimitedAggregation.png" alt="GeoGebra diffusion-limited aggregation preview">';
            blenderPreview =
                "<p>Blender preview not yet available for this object.</p>";
            break;

        case "geneticDrift":
            geoGebraPreview =
                '<img src="media/geneticDriftComparison.png" alt="GeoGebra genetic drift frequency comparison preview">';
            blenderPreview =
                "<p>Blender preview not yet available for this object.</p>";
        break;

        case "geneticDriftGrid":
            geoGebraPreview =
                '<img src="media/gridDriftPopulationSampling.png" alt="GeoGebra genetic drift grid population preview">';
            blenderPreview =
                "<p>Blender preview not yet available for this object.</p>";
            break;

        case "geneticDriftBranchingAncestry":
            geoGebraPreview =
                '<img src="media/geneticDriftBranchingAncestry.png" alt="GeoGebra genetic drift branching ancestry preview">';
            blenderPreview =
                "<p>Blender preview not yet available for this object.</p>";
            break;uble

        case "geneticDriftBranching":
            geoGebraPreview =
                '<img src="media/geneticDriftBranching.png" alt="GeoGebra allele branching Galton-Watson preview">';
            blenderPreview =
                "<p>Blender preview not yet available for this object.</p>";
            break;

        case "epidemicBranching":
            geoGebraPreview =
            "<p>GeoGebra preview not yet available for Epidemic Branching Process.</p>";
            blenderPreview =
            "<p>Blender preview not yet available for this object.</p>";
        break;

        default:
            geoGebraPreview = "<p>GeoGebra preview not yet available for this object.</p>";
            blenderPreview = "<p>Blender preview not yet available for this object.</p>";
            break;
    }

    geoGebraPreviewBox.innerHTML = geoGebraPreview;
    blenderPreviewBox.innerHTML = blenderPreview;
}

function generateGeoGebraSpiral(kind) {
    let name = document.getElementById("spiralName").value;
    let a = document.getElementById("spiralA").value;
    let b = document.getElementById("spiralB").value;
    let t = document.getElementById("spiralParam").value;
    let start = document.getElementById("spiralStart").value;
    let end = document.getElementById("spiralEnd").value;

    let radial = "";

    if (kind === "arch") {
        radial = `${a} ${t}`;
    } else if (kind === "log") {
        radial = `${a} exp(${b} ${t})`;
    } else if (kind === "fermat") {
        radial = `${a} sqrt(${t})`;
    }

    let code =
`${name} = Curve((${radial}) cos(${t}), (${radial}) sin(${t}), ${t}, ${start}, ${end})`;

    setOutputs(code);
}

function updateFormula() {
    let objectType = document.getElementById("objectType").value;
    let formula = "";

    switch(objectType) {
        
        case "gerono":
            formula = "x = a cos(t), y = a sin(t) cos(t)";
            break;

        case "torusSurface":
            formula =
            "x=(R+r cos(v)) cos(u), y=(R+r cos(v)) sin(u), z=r sin(v)";
            break;

        case "torusDoubleHelix":
            formula =
        "Torus surface: x = (R + r cos(v)) cos(u), y = (R + r cos(v)) sin(u), z = r sin(v). The double helix is formed by setting u = t and v = k t, with the second strand phase-shifted around the tube.";
        break;

        case "tetrahedron":
            formula =
            "Regular tetrahedron: 4 faces, 4 vertices, 6 edges";
        break;

        case "cube":
            formula =
            "Regular cube: 6 faces, 8 vertices, 12 edges";
        break;

        case "octahedron":
            formula =
            "Regular octahedron: 8 faces, 6 vertices, 12 edges";
        break;

        case "icosahedron":
            formula =
            "Regular icosahedron: 20 faces, 12 vertices, 30 edges";
        break;

        case "dodecahedron":
            formula =
            "Regular dodecahedron: 12 faces, 20 vertices, 30 edges";
        break;

        case "mobiusStrip":
            formula =
            "x=(R+v cos(u/2))cos(u), y=(R+v cos(u/2))sin(u), z=v sin(u/2)";
        break;

        case "helix":
            formula = "x = a cos(t), y = a sin(t), z = b t";
        break;

        case "doubleHelix":
            formula =
                "Strand 1: x = r cos(t), y = r sin(t), z = b t. Strand 2: x = r cos(t + pi), y = r sin(t + pi), z = b t.";
            break;

        case "doubleHelixBasePairs":
            formula =
                "Two phase-shifted helices are joined by line segments between corresponding parameter values, representing simplified base-pair rungs.";
            break;

        case "dnaDoubleHelixSNP":
            formula = "Double helix: x = r cos(t), y = r sin(t), z = b t. The second strand is phase-shifted by pi. One selected rung is highlighted as the SNP site.";
        break;

        case "geneticDriftGrid":
            formula = "If the current red frequency is p, each individual in the next generation is red with probability p and blue with probability 1 - p.";
        break;

        case "geneticDriftBranching":
        formula = "Each offspring allele copy chooses one source allele copy at random from the previous generation. Descendant counts are random but constrained to sum to the fixed population size.";
        break;

        case "geneticDriftBranchingAncestry":
            formula = "Each offspring allele copy chooses one source allele copy at random from the previous generation. Descendant counts are random but constrained to sum to the fixed population size.";
        break;

        case "epidemicBranching":
            formula =
        "Each infected individual has c possible contacts. Each contact is infected with probability p. The expected number of new infections is R = c p. If R is below 1, outbreaks usually die out; if R is above 1, outbreaks may grow.";
        break;

        case "booth":
            formula = "x = a sin(t)/(1 + cos²(t)), y = a sin(t) cos(t)/(1 + cos²(t))";
            break;

        case "bernoulli":
            formula = "(x² + y²)² = 2a²(x² − y²)";
            break;

        case "cosRose":
            formula = "r = a cos(kθ)";
            break;

        case "sinRose":
            formula = "r = a sin(kθ)";
            break;

        case "archSpiral":
            formula = "r = aθ";
            break;

        case "logSpiral":
            formula = "r = ae^(bθ)";
            break;

        case "fermatSpiral":
            formula = "r = a√θ";
            break;

        case "galtonWatson":
            formula = "Mean offspring m = 2p";
            break;

        case "reactionDiffusion":
        formula =
        "Two fields, U and V, diffuse across a grid and react locally. U acts like a background food supply, while V acts like a pattern-forming chemical. Their interaction can amplify small local disturbances into visible spatial patterns.";
        break;

        case "cellBranching":
            formula = "p0 + p1 + p2 = 1, mean offspring m = p1 + 2p2";
        break;

        case "cellBranchingStats":
            formula =
                "p1 = 1 − p0 − p2, mean offspring m = p1 + 2p2";
        break;

        case "cellBranchingCombined":
        formula =
        "Each cell has three possible outcomes: death with probability p0, one-child continuation with probability p1, or two-child proliferation with probability p2, where p1 = 1 - p0 - p2. The same probabilities drive both the visible tree and the repeated-trial statistics.";
        break;

        case "gwExtinction":
            formula = "Estimated extinction probability = extinct trials / total trials";
            break;

        case "lissajous":
            formula =
                "x = A sin(aθ + δ), y = B sin(bθ)";
            break;

         case "animatedLissajous":
            formula =
                "x = A sin(aθ + phase), y = B sin(bθ)";
            break;

        case "cycloid":
            formula =
                "x = r(t − sin(t)), y = r(1 − cos(t))";
            break;

        case "epicycloid":
            formula =
                "x = (R+r)cos(t) − r cos((R+r)t/r), y = (R+r)sin(t) − r sin((R+r)t/r)";
            break;

        case "hypocycloid":
            formula =
                "x = (R−r)cos(t) + r cos((R−r)t/r), y = (R−r)sin(t) − r sin((R−r)t/r)";
            break;

        case "rotate":
            formula =
                "Rotate(Object, angle, pivot)";
        break;

        case "translate":
            formula = "Translate(Object, Vector)";
        break;

        case "scale":
            formula = "Dilate(Object, scale factor, centre)";
        break;

        case "reflect":
            formula = "Reflect(Object, mirror)";
        break;

        case "fibonacciSpiral":
            formula =
                "r = a e^(bt), with b chosen to approximate golden-ratio growth";
        break;

        case "fibonacciTiling":
            formula =
                "side lengths: 1, 1, 2, 3, 5, 8, 13, ...";
        break;

        case "hilbertCurve":
            formula =
                "Recursive construction; order n produces 4^n points.";
        break;

        case "kochCurve":
            formula =
                "Recursive construction; each segment becomes 4 segments.";
        break;

        case "kochSnowflake":
            formula =
                "Recursive construction on three sides of an equilateral triangle.";
        break;

        case "sierpinskiTriangle":
            formula =
                "Recursive subdivision; each triangle becomes 3 smaller triangles.";
        break;

        case "sierpinskiIcosahedron":
        formula = "Each icosahedron face is a triangle with vertices A, B, and C. Sierpinski subdivision repeatedly replaces a triangle by three smaller corner triangles.";
        break;
        
        case "sierpinskiIcosahedronScene":
            formula = "The model begins with the vertices of an icosahedron. A Sierpinski-style recursive subdivision places smaller icosahedral structures at selected vertex positions. Blender then renders the structure using spheres, edges, a central sphere, torus, and animation.";
        break;

        case "birthDeathProcess":
        formula =
        "Each individual gives birth at rate λ and dies at rate μ. The total event rate is proportional to the current population size, with births increasing the population by 1 and deaths decreasing it by 1.";
        break;

        case "birthDeathStats":
            formula =
            "Repeated trials of a birth-death process; extinction rate = extinctions / trials";
        break;

        case "birthDeathSamplePaths":
        formula =
        "Each path follows the same birth-death rules: births occur at rate λN and deaths at rate μN. Multiple paths show the spread of possible outcomes from repeated stochastic runs.";
        break;

        case "reactionDiffusion":
    formula = "Gray-Scott style model: U diffuses and is fed into the system; V diffuses, reacts with U, and is removed. The visible grid colour represents the local amount of V.";
        break;

        case "diffusionLimitedAggregation":
    formula = "Random walk rule: position changes by one random step at a time. In Branching Growth, a walker attaches when it touches the growing deposit. In Compact Growth, after a small starter deposit forms, a walker attaches only when it touches at least two deposit particles.";
        break;

    case "geneticDrift":
    formula = "Sampling rule: if the current allele frequency is p, the next generation is sampled randomly from 2N allele copies. The new frequency is the sampled allele count divided by 2N.";
    break;

        default:
            formula = "";
    }

    document.getElementById("formulaBox").innerHTML = formula;
}

function generateGeoGebraLissajous() {

    let name =
        document.getElementById("lissajousName").value;

    let A =
        document.getElementById("lissajousA").value;

    let B =
        document.getElementById("lissajousB").value;

    let a =
        document.getElementById("lissajousFreqA").value;

    let b =
        document.getElementById("lissajousFreqB").value;

    let phase =
        document.getElementById("lissajousPhase").value;

    let code =
`${name} = Curve(${A} sin(${a} t + ${phase}), ${B} sin(${b} t), t, 0, 2*pi)`;

    setOutputs(code);
}

function generateGeoGebraAnimatedLissajous() {

    let name = document.getElementById("lissajousName").value;
    let A = document.getElementById("lissajousA").value;
    let B = document.getElementById("lissajousB").value;
    let a = document.getElementById("lissajousFreqA").value;
    let b = document.getElementById("lissajousFreqB").value;

    let code =
`phase = 0
${name} = Curve(${A} sin(${a} t + phase), ${B} sin(${b} t), t, 0, 2*pi)`;

    setOutputs(code);
}

function generateGeoGebraTorusDoubleHelix() {

    const R = Number(document.getElementById("tdhMajorRadius").value);
    const r = Number(document.getElementById("tdhTubeRadius").value);
    const windings = Number(document.getElementById("tdhWindings").value);
    const strandOffset = Number(document.getElementById("tdhStrandOffset").value);
    const rungCount = Number(document.getElementById("tdhRungCount").value);
    const lift = Number(document.getElementById("tdhLift").value);

    let commands =
`// Torus with Double Helix
//
// No long manual GeoGebra Input paste is needed for this object.
//
// Paste the GeoGebra Global JavaScript into GeoGebra.
// Then use the GeoGebra Button Setup panel to create the buttons.
//
// Press the Build torus double helix button to construct:
//
// 1. the torus surface
// 2. the two helical strands
// 3. the connecting rungs
//
// Optional direct call:
//
// buildTorusDoubleHelix();
`;

    let code =
`// GeoGebra Global JavaScript
// Torus with Double Helix

function tdhNumber(x) {
    return Number(x).toFixed(4);
}

function buildTorusDoubleHelix() {

    clearTorusDoubleHelix();

    var R = ${R};
    var r = ${r};
    var windings = ${windings};
    var strandOffset = ${strandOffset};
    var rungCount = ${rungCount};
    var lift = ${lift};

    var helixRadius = r + lift;

    ggbApplet.evalCommand(
        "TorusSurface = Surface(" +
        "(" + R + " + " + r + " cos(v)) cos(u), " +
        "(" + R + " + " + r + " cos(v)) sin(u), " +
        r + " sin(v), " +
        "u, 0, 2*pi, v, 0, 2*pi)"
    );

    ggbApplet.evalCommand(
        "TDH1 = Curve(" +
        "(" + R + " + " + helixRadius + " cos(" + windings + " t)) cos(t), " +
        "(" + R + " + " + helixRadius + " cos(" + windings + " t)) sin(t), " +
        helixRadius + " sin(" + windings + " t), " +
        "t, 0, 2*pi)"
    );

    ggbApplet.evalCommand(
        "TDH2 = Curve(" +
        "(" + R + " + " + helixRadius + " cos(" + windings + " t + " + strandOffset + ")) cos(t), " +
        "(" + R + " + " + helixRadius + " cos(" + windings + " t + " + strandOffset + ")) sin(t), " +
        helixRadius + " sin(" + windings + " t + " + strandOffset + "), " +
        "t, 0, 2*pi)"
    );

    for (var i = 0; i < rungCount; i++) {

        var t = i * 2 * Math.PI / rungCount;

        var v1 = windings * t;
        var v2 = windings * t + strandOffset;

        var x1 = (R + helixRadius * Math.cos(v1)) * Math.cos(t);
        var y1 = (R + helixRadius * Math.cos(v1)) * Math.sin(t);
        var z1 = helixRadius * Math.sin(v1);

        var x2 = (R + helixRadius * Math.cos(v2)) * Math.cos(t);
        var y2 = (R + helixRadius * Math.cos(v2)) * Math.sin(t);
        var z2 = helixRadius * Math.sin(v2);

        ggbApplet.evalCommand(
            "TDH_P1_" + i + " = (" +
            tdhNumber(x1) + ", " +
            tdhNumber(y1) + ", " +
            tdhNumber(z1) + ")"
        );

        ggbApplet.evalCommand(
            "TDH_P2_" + i + " = (" +
            tdhNumber(x2) + ", " +
            tdhNumber(y2) + ", " +
            tdhNumber(z2) + ")"
        );

        ggbApplet.evalCommand(
            "TDH_Rung_" + i + " = Segment(TDH_P1_" + i + ", TDH_P2_" + i + ")"
        );
    }

    styleTorusDoubleHelix();
}

function styleTorusDoubleHelix() {

    try {
    ggbApplet.setColor("TorusSurface", 215, 215, 215);
    ggbApplet.setFilling("TorusSurface", 0.22);
    ggbApplet.setLineThickness("TorusSurface", 0);
    ggbApplet.setLabelVisible("TorusSurface", false);
    } catch(e) {}

    try {
        ggbApplet.setColor("TDH1", 60, 130, 255);
        ggbApplet.setColor("TDH2", 220, 90, 220);
        ggbApplet.setLineThickness("TDH1", 5);
        ggbApplet.setLineThickness("TDH2", 5);
        ggbApplet.setLabelVisible("TDH1", false);
        ggbApplet.setLabelVisible("TDH2", false);
    } catch(e) {}

    for (var i = 0; i < ${rungCount}; i++) {
        try {
            ggbApplet.setColor("TDH_Rung_" + i, 230, 230, 230);
            ggbApplet.setLineThickness("TDH_Rung_" + i, 2);
            ggbApplet.setLabelVisible("TDH_Rung_" + i, false);

            ggbApplet.setVisible("TDH_P1_" + i, false);
            ggbApplet.setVisible("TDH_P2_" + i, false);
            ggbApplet.setLabelVisible("TDH_P1_" + i, false);
            ggbApplet.setLabelVisible("TDH_P2_" + i, false);
        } catch(e) {}
    }
}

function hideTorusSurface() {
    try {
        ggbApplet.setVisible("TorusSurface", false);
    } catch(e) {}
}

function showTorusSurface() {
    try {
        ggbApplet.setVisible("TorusSurface", true);
        styleTorusDoubleHelix();
    } catch(e) {}
}

function clearTorusDoubleHelix() {

    for (var i = ggbApplet.getObjectNumber() - 1; i >= 0; i--) {
        try {
            var obj = ggbApplet.getObjectName(i);

            if (
                obj === "TorusSurface" ||
                obj === "TDH1" ||
                obj === "TDH2" ||
                obj.indexOf("TDH_P1_") === 0 ||
                obj.indexOf("TDH_P2_") === 0 ||
                obj.indexOf("TDH_Rung_") === 0
            ) {
                ggbApplet.deleteObject(obj);
            }
        } catch(e) {}
    }
}
`;

    let blenderCode =
`import bpy
import math
from mathutils import Vector

# ------------------------------------------------------------
# Blender Torus with Double Helix
# Generated by the Visual Mathematics Framework
# ------------------------------------------------------------

bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)

R = ${R}
r = ${r}
WINDINGS = ${windings}
STRAND_OFFSET = ${strandOffset}
RUNG_COUNT = ${rungCount}
LIFT = ${lift}

HELIX_RADIUS = r + LIFT
SAMPLES = 360

def make_material(name, color, roughness=0.35, alpha=1.0):
    mat = bpy.data.materials.new(name=name)
    mat.use_nodes = True

    bsdf = mat.node_tree.nodes.get("Principled BSDF")

    if bsdf:
        bsdf.inputs["Base Color"].default_value = color
        bsdf.inputs["Alpha"].default_value = alpha
        bsdf.inputs["Roughness"].default_value = roughness

    if alpha < 1.0:
        mat.blend_method = 'BLEND'

    return mat

mat_torus = make_material("Translucent icy blue torus", (0.55, 0.82, 1.0, 0.34), roughness=0.28, alpha=0.34)
mat_strand_1 = make_material("Blue helix strand", (0.15, 0.48, 1.0, 1.0), roughness=0.22)
mat_strand_2 = make_material("Magenta helix strand", (0.95, 0.28, 0.95, 1.0), roughness=0.22)
mat_rung = make_material("White rungs", (0.92, 0.92, 0.95, 1.0), roughness=0.25)

bpy.ops.mesh.primitive_torus_add(
    major_radius=R,
    minor_radius=r,
    major_segments=160,
    minor_segments=36,
    location=(0, 0, 0)
)

torus = bpy.context.object
torus.name = "Torus surface"
torus.data.materials.append(mat_torus)

def torus_helix_point(t, offset):
    v = WINDINGS * t + offset
    x = (R + HELIX_RADIUS * math.cos(v)) * math.cos(t)
    y = (R + HELIX_RADIUS * math.cos(v)) * math.sin(t)
    z = HELIX_RADIUS * math.sin(v)
    return Vector((x, y, z))

def create_curve(name, points, material, bevel_depth):
    curve = bpy.data.curves.new(name=name, type='CURVE')
    curve.dimensions = '3D'
    curve.resolution_u = 3
    curve.bevel_depth = bevel_depth
    curve.bevel_resolution = 5

    spline = curve.splines.new('POLY')
    spline.points.add(len(points) - 1)

    for p, co in zip(spline.points, points):
        p.co = (co.x, co.y, co.z, 1.0)

    obj = bpy.data.objects.new(name, curve)
    bpy.context.collection.objects.link(obj)
    obj.data.materials.append(material)

    return obj

points1 = []
points2 = []

for i in range(SAMPLES + 1):
    t = 2 * math.pi * i / SAMPLES
    points1.append(torus_helix_point(t, 0.0))
    points2.append(torus_helix_point(t, STRAND_OFFSET))

strand1 = create_curve("Torus double helix strand 1", points1, mat_strand_1, 0.045)
strand2 = create_curve("Torus double helix strand 2", points2, mat_strand_2, 0.045)

def create_cylinder_between(name, p1, p2, radius, material):
    mid = (p1 + p2) / 2
    direction = p2 - p1
    length = direction.length

    bpy.ops.mesh.primitive_cylinder_add(
        vertices=16,
        radius=radius,
        depth=length,
        location=mid
    )

    obj = bpy.context.object
    obj.name = name
    obj.rotation_mode = 'QUATERNION'
    obj.rotation_quaternion = direction.to_track_quat('Z', 'Y')
    obj.data.materials.append(material)

    return obj

for i in range(RUNG_COUNT):
    t = 2 * math.pi * i / RUNG_COUNT
    p1 = torus_helix_point(t, 0.0)
    p2 = torus_helix_point(t, STRAND_OFFSET)
    create_cylinder_between("Torus helix rung " + str(i), p1, p2, 0.018, mat_rung)

# Lighting
bpy.ops.object.light_add(type='AREA', location=(0, -6, 7))
light = bpy.context.object
light.name = "Large softbox"
light.data.energy = 500
light.data.size = 6

bpy.ops.object.light_add(type='POINT', location=(-4, 4, 4))
rim = bpy.context.object
rim.name = "Small rim light"
rim.data.energy = 110

# Camera
bpy.ops.object.camera_add(
    location=(6.5, -8.5, 5.2),
    rotation=(math.radians(60), 0, math.radians(38))
)

camera = bpy.context.object
bpy.context.scene.camera = camera
camera.data.lens = 32

bpy.context.scene.render.resolution_x = 1200
bpy.context.scene.render.resolution_y = 900

world = bpy.context.scene.world
if world:
    world.color = (0.82, 0.84, 0.88)

# Slow rotation animation
animated_objects = [
    torus,
    strand1,
    strand2
]

for obj in bpy.context.scene.objects:
    if obj.name.startswith("Torus helix rung "):
        animated_objects.append(obj)

empty = bpy.data.objects.new("Torus double helix rotation control", None)
bpy.context.collection.objects.link(empty)

for obj in animated_objects:
    obj.parent = empty

bpy.context.scene.frame_start = 1
bpy.context.scene.frame_end = 180

empty.rotation_euler = (0, 0, 0)
empty.keyframe_insert(data_path="rotation_euler", frame=1)

empty.rotation_euler = (0, 0, math.radians(360))
empty.keyframe_insert(data_path="rotation_euler", frame=180)

# Make the rotation steady rather than ease-in/ease-out
try:
    action = empty.animation_data.action

    for fcurve in action.fcurves:
        for keyframe in fcurve.keyframe_points:
            keyframe.interpolation = 'LINEAR'

except Exception:
    pass

for obj in bpy.context.scene.objects:
    if obj.type == 'MESH':
        bpy.context.view_layer.objects.active = obj
        obj.select_set(True)
        try:
            bpy.ops.object.shade_smooth()
        except Exception:
            pass
        obj.select_set(False)
`;

    let buttonInstructions =
`Create these GeoGebra buttons.

Button label:
Build torus double helix

On Click JavaScript:
buildTorusDoubleHelix();

Button label:
Style torus double helix

On Click JavaScript:
styleTorusDoubleHelix();

Button label:
Hide torus surface

On Click JavaScript:
hideTorusSurface();

Button label:
Show torus surface

On Click JavaScript:
showTorusSurface();

Button label:
Clear torus double helix

On Click JavaScript:
clearTorusDoubleHelix();
`;

    setOutputs(commands, code, blenderCode, buttonInstructions);
}

function generateGeoGebraTorusSurface() {

    let name = document.getElementById("torusCurveName").value;

    let R = document.getElementById("torusMajorR").value;
    let r = document.getElementById("torusMinorR").value;

    let code =
`${name} = Surface((${R} + ${r} cos(v)) cos(u), (${R} + ${r} cos(v)) sin(u), ${r} sin(v), u, 0, 2*pi, v, 0, 2*pi)`;

    setOutputs(code);
}

function makeMeshEngineCode(meshFunctionName, buildFunctionName, styleFunctionName,
                            showStaticFunctionName, hideStaticFunctionName,
                            showRotatingFunctionName, hideRotatingFunctionName,
                            startFunctionName, stopFunctionName, resetFunctionName,
                            staticR, staticG, staticB,
                            rotatingR, rotatingG, rotatingB) {

    return `
if (typeof Meshes === "undefined") {
    Meshes = {};
}

function makePointName(prefix, index) {
    return prefix + "P" + index;
}

function makeFaceName(prefix, index) {
    return prefix + "Face" + index;
}

function makeRotPointName(prefix, index) {
    return prefix + "RP" + index;
}

function makeRotFaceName(prefix, index) {
    return prefix + "RFace" + index;
}

function runCommands(cmds) {

    for (var i = 0; i < cmds.length; i++) {
        try {
            ggbApplet.evalCommand(cmds[i]);
        } catch(e) {
            alert("Problem with command:\\\\n" + cmds[i]);
            return;
        }
    }
}

function buildMeshObject(mesh) {
    buildMesh(mesh.prefix, mesh.vertices, mesh.faces);
}

function buildRotatingMeshObject(mesh) {
    buildRotatingMesh(mesh.prefix, mesh.vertices, mesh.faces);
}

function buildMesh(prefix, vertices, faces) {

    var cmds = [];

    for (var i = 0; i < vertices.length; i++) {
        var p = vertices[i];

        cmds.push(
            makePointName(prefix, i) +
            " = (" + p[0] + ", " + p[1] + ", " + p[2] + ")"
        );
    }

    for (var f = 0; f < faces.length; f++) {

        var parts = [];

        for (var k = 0; k < faces[f].length; k++) {
            parts.push(makePointName(prefix, faces[f][k]));
        }

        cmds.push(
            makeFaceName(prefix, f) +
            " = Polygon(" + parts.join(", ") + ")"
        );
    }

    runCommands(cmds);

    registerMesh(prefix, vertices, faces, false);
}

function buildRotatingMesh(prefix, vertices, faces) {

    var cmds = [];

    cmds.push("ang = 0");
    cmds.push("theta = ang * pi / 180");

    for (var i = 0; i < vertices.length; i++) {
        var p = vertices[i];

        var x = p[0];
        var y = p[1];
        var z = p[2];

        cmds.push(
            makeRotPointName(prefix, i) +
            " = (" +
            x + ", " +
            "(" + y + ") * cos(theta) - (" + z + ") * sin(theta), " +
            "(" + y + ") * sin(theta) + (" + z + ") * cos(theta)" +
            ")"
        );
    }

    for (var f = 0; f < faces.length; f++) {

        var parts = [];

        for (var k = 0; k < faces[f].length; k++) {
            parts.push(makeRotPointName(prefix, faces[f][k]));
        }

        cmds.push(
            makeRotFaceName(prefix, f) +
            " = Polygon(" + parts.join(", ") + ")"
        );
    }

    runCommands(cmds);

    registerMesh(prefix + "R", vertices, faces, true);
}

function registerMesh(prefix, vertices, faces, rotating) {

    var pointNames = [];
    var faceNames = [];

    var basePrefix = prefix;

    if (rotating) {
        basePrefix = prefix.substring(0, prefix.length - 1);
    }

    for (var i = 0; i < vertices.length; i++) {
        if (rotating) {
            pointNames.push(makeRotPointName(basePrefix, i));
        } else {
            pointNames.push(makePointName(basePrefix, i));
        }
    }

    for (var f = 0; f < faces.length; f++) {
        if (rotating) {
            faceNames.push(makeRotFaceName(basePrefix, f));
        } else {
            faceNames.push(makeFaceName(basePrefix, f));
        }
    }

    Meshes[prefix] = {
        points: pointNames,
        faces: faceNames
    };
}

function styleMesh(prefix, r, g, b, filling, lineThickness) {

    var M = Meshes[prefix];

    if (!M) {
        alert("No mesh registered with prefix: " + prefix);
        return;
    }

    for (var i = 0; i < M.points.length; i++) {
        try {
            ggbApplet.setLabelVisible(M.points[i], false);
            ggbApplet.setVisible(M.points[i], false);
        } catch(e) {}
    }

    for (var f = 0; f < M.faces.length; f++) {
        try {
            ggbApplet.setColor(M.faces[f], r, g, b);
            ggbApplet.setFilling(M.faces[f], filling);
            ggbApplet.setLineThickness(M.faces[f], lineThickness);
            ggbApplet.setLabelVisible(M.faces[f], false);
        } catch(e) {}
    }
}

function showMesh(prefix, visible) {

    var M = Meshes[prefix];

    if (!M) {
        alert("No mesh registered with prefix: " + prefix);
        return;
    }

    for (var f = 0; f < M.faces.length; f++) {
        try {
            ggbApplet.setVisible(M.faces[f], visible);
        } catch(e) {}
    }
}

function ${buildFunctionName}() {

    var mesh = ${meshFunctionName}();

    buildMeshObject(mesh);
    buildRotatingMeshObject(mesh);
}

function ${styleFunctionName}() {

    var mesh = ${meshFunctionName}();

    styleMesh(mesh.prefix, ${staticR}, ${staticG}, ${staticB}, 0.15, 1);
    styleMesh(mesh.prefix + "R", ${rotatingR}, ${rotatingG}, ${rotatingB}, 0.55, 2);
}

function ${showStaticFunctionName}() {
    var mesh = ${meshFunctionName}();
    showMesh(mesh.prefix, true);
}

function ${hideStaticFunctionName}() {
    var mesh = ${meshFunctionName}();
    showMesh(mesh.prefix, false);
}

function ${showRotatingFunctionName}() {
    var mesh = ${meshFunctionName}();
    showMesh(mesh.prefix + "R", true);
}

function ${hideRotatingFunctionName}() {
    var mesh = ${meshFunctionName}();
    showMesh(mesh.prefix + "R", false);
}

function ${startFunctionName}() {
    ggbApplet.evalCommand("StartAnimation(ang, true)");
}

function ${stopFunctionName}() {
    ggbApplet.evalCommand("StartAnimation(ang, false)");
}

function ${resetFunctionName}() {
    ggbApplet.evalCommand("SetValue(ang, 0)");
}`;
}

function generateGeoGebraCube() {

    let name = document.getElementById("cubeName").value;
    let s = document.getElementById("cubeSize").value;

    let instructions =
`// Cube construction uses the general GeoGebra mesh engine.
//
// Paste the JavaScript code from the GeoGebra Global JavaScript panel
// into GeoGebra's Global JavaScript section.
//
// Use the GeoGebra Button Setup panel for the required button calls.
//
// Recommended first test:
//
// 1. Run buildCube();
// 2. Run styleCube();
// 3. Run hideStaticCube();
// 4. Run startCubeRotation();
//
// The cube is stored as:
//
// vertices + faces
//
// The angle variable 'ang' is created automatically by buildCube().
// If GeoGebra does not show it as a slider, make 'ang' visible manually
// and set its range to 0 to 360 with increment 1.`;

    let jsCode =
`function getCubeMesh() {

    var s = ${s};

    return {
        prefix: "${name}",

        vertices: [
            [0, 0, 0],
            [s, 0, 0],
            [s, s, 0],
            [0, s, 0],

            [0, 0, s],
            [s, 0, s],
            [s, s, s],
            [0, s, s]
        ],

        faces: [
            [0, 1, 2, 3],
            [4, 5, 6, 7],
            [0, 1, 5, 4],
            [3, 2, 6, 7],
            [0, 3, 7, 4],
            [1, 2, 6, 5]
        ]
    };
}
`;

    jsCode += makeMeshEngineCode(
        "getCubeMesh",
        "buildCube",
        "styleCube",
        "showStaticCube",
        "hideStaticCube",
        "showRotatingCube",
        "hideRotatingCube",
        "startCubeRotation",
        "stopCubeRotation",
        "resetCubeRotation",
        180, 180, 180,
        80, 170, 255
    );

    let buttonInstructions =
`Create these GeoGebra buttons.

Button label:
Build cube

On Click JavaScript:
buildCube();

Button label:
Style cube

On Click JavaScript:
styleCube();

Button label:
Hide static cube

On Click JavaScript:
hideStaticCube();

Button label:
Show static cube

On Click JavaScript:
showStaticCube();

Button label:
Hide rotating cube

On Click JavaScript:
hideRotatingCube();

Button label:
Show rotating cube

On Click JavaScript:
showRotatingCube();

Button label:
Start cube rotation

On Click JavaScript:
startCubeRotation();

Button label:
Stop cube rotation

On Click JavaScript:
stopCubeRotation();

Button label:
Reset cube rotation

On Click JavaScript:
resetCubeRotation();
`;

    setOutputs(instructions, jsCode, "", buttonInstructions);
}

function generateGeoGebraTetrahedron() {

    let name = document.getElementById("tetraName").value;
    let s = document.getElementById("tetraSize").value;

    let instructions =
`// Tetrahedron construction uses the general GeoGebra mesh engine.
//
// Paste the JavaScript code from the GeoGebra Global JavaScript panel
// into GeoGebra's Global JavaScript section.
//
// Use the GeoGebra Button Setup panel for the required button calls.
//
// Recommended first test:
//
// 1. Run buildTetrahedron();
// 2. Run styleTetrahedron();
// 3. Run hideStaticTetrahedron();
// 4. Run startTetrahedronRotation();
//
// The tetrahedron is stored as:
//
// vertices + faces
//
// The angle variable 'ang' is created automatically by buildTetrahedron().
// If GeoGebra does not show it as a slider, make 'ang' visible manually
// and set its range to 0 to 360 with increment 1.`;

    let jsCode =
`function getTetrahedronMesh() {

    var s = ${s};

    return {
        prefix: "${name}",

        vertices: [
            [0, 0, 0],
            [s, 0, 0],
            [s / 2, s * Math.sqrt(3) / 2, 0],
            [s / 2, s * Math.sqrt(3) / 6, s * Math.sqrt(6) / 3]
        ],

        faces: [
            [0, 1, 2],
            [0, 1, 3],
            [1, 2, 3],
            [2, 0, 3]
        ]
    };
}
`;

    jsCode += makeMeshEngineCode(
        "getTetrahedronMesh",
        "buildTetrahedron",
        "styleTetrahedron",
        "showStaticTetrahedron",
        "hideStaticTetrahedron",
        "showRotatingTetrahedron",
        "hideRotatingTetrahedron",
        "startTetrahedronRotation",
        "stopTetrahedronRotation",
        "resetTetrahedronRotation",
        180, 180, 180,
        80, 140, 255
    );

    let buttonInstructions =
`Create these GeoGebra buttons.

Button label:
Build tetrahedron

On Click JavaScript:
buildTetrahedron();

Button label:
Style tetrahedron

On Click JavaScript:
styleTetrahedron();

Button label:
Hide static tetrahedron

On Click JavaScript:
hideStaticTetrahedron();

Button label:
Show static tetrahedron

On Click JavaScript:
showStaticTetrahedron();

Button label:
Hide rotating tetrahedron

On Click JavaScript:
hideRotatingTetrahedron();

Button label:
Show rotating tetrahedron

On Click JavaScript:
showRotatingTetrahedron();

Button label:
Start tetrahedron rotation

On Click JavaScript:
startTetrahedronRotation();

Button label:
Stop tetrahedron rotation

On Click JavaScript:
stopTetrahedronRotation();

Button label:
Reset tetrahedron rotation

On Click JavaScript:
resetTetrahedronRotation();
`;

    setOutputs(instructions, jsCode, "", buttonInstructions);
}

function generateGeoGebraOctahedron() {

    let name = document.getElementById("octaName").value;
    let s = document.getElementById("octaSize").value;

    let instructions =
`// Octahedron construction uses the general GeoGebra mesh engine.
//
// Paste the JavaScript code from the GeoGebra Global JavaScript panel
// into GeoGebra's Global JavaScript section.
//
// Use the GeoGebra Button Setup panel for the required button calls.
//
// Recommended first test:
//
// 1. Run buildOctahedron();
// 2. Run styleOctahedron();
// 3. Run hideStaticOctahedron();
// 4. Run startOctahedronRotation();
//
// The angle variable 'ang' is created automatically by buildOctahedron().
// If GeoGebra does not show it as a slider, make 'ang' visible manually
// and set its range to 0 to 360 with increment 1.`;

    let jsCode =
`function getOctahedronMesh() {

    var s = ${s};

    return {
        prefix: "${name}",

        vertices: [
            [0, 0, s],
            [0, 0, -s],
            [s, 0, 0],
            [-s, 0, 0],
            [0, s, 0],
            [0, -s, 0]
        ],

        faces: [
            [0, 2, 4],
            [0, 4, 3],
            [0, 3, 5],
            [0, 5, 2],

            [1, 4, 2],
            [1, 3, 4],
            [1, 5, 3],
            [1, 2, 5]
        ]
    };
}
`;

    jsCode += makeMeshEngineCode(
        "getOctahedronMesh",
        "buildOctahedron",
        "styleOctahedron",
        "showStaticOctahedron",
        "hideStaticOctahedron",
        "showRotatingOctahedron",
        "hideRotatingOctahedron",
        "startOctahedronRotation",
        "stopOctahedronRotation",
        "resetOctahedronRotation",
        180, 180, 180,
        120, 200, 255
    );

    let buttonInstructions =
`Create these GeoGebra buttons.

Button label:
Build octahedron

On Click JavaScript:
buildOctahedron();

Button label:
Style octahedron

On Click JavaScript:
styleOctahedron();

Button label:
Hide static octahedron

On Click JavaScript:
hideStaticOctahedron();

Button label:
Show static octahedron

On Click JavaScript:
showStaticOctahedron();

Button label:
Hide rotating octahedron

On Click JavaScript:
hideRotatingOctahedron();

Button label:
Show rotating octahedron

On Click JavaScript:
showRotatingOctahedron();

Button label:
Start octahedron rotation

On Click JavaScript:
startOctahedronRotation();

Button label:
Stop octahedron rotation

On Click JavaScript:
stopOctahedronRotation();

Button label:
Reset octahedron rotation

On Click JavaScript:
resetOctahedronRotation();
`;

    setOutputs(instructions, jsCode, "", buttonInstructions);
}

function generateGeoGebraIcosahedron() {

    let name = document.getElementById("icosaName").value;
    let s = document.getElementById("icosaSize").value;

    let instructions =
`// Icosahedron construction uses the general GeoGebra mesh engine.
//
// Paste the JavaScript code from the GeoGebra Global JavaScript panel
// into GeoGebra's Global JavaScript section.
//
// Use the GeoGebra Button Setup panel for the required button calls.
//
// Recommended first test:
//
// 1. Run buildIcosahedron();
// 2. Run styleIcosahedron();
// 3. Run hideStaticIcosahedron();
// 4. Run startIcosahedronRotation();
//
// The angle variable 'ang' is created automatically by buildIcosahedron().
// If GeoGebra does not show it as a slider, make 'ang' visible manually
// and set its range to 0 to 360 with increment 1.`;

    let jsCode =
`function getIcosahedronMesh() {

    var s = ${s};
    var phi = (1 + Math.sqrt(5)) / 2;

    return {
        prefix: "${name}",

        vertices: [
            [0, -s, -s * phi],
            [0, -s,  s * phi],
            [0,  s, -s * phi],
            [0,  s,  s * phi],

            [-s, -s * phi, 0],
            [-s,  s * phi, 0],
            [ s, -s * phi, 0],
            [ s,  s * phi, 0],

            [-s * phi, 0, -s],
            [ s * phi, 0, -s],
            [-s * phi, 0,  s],
            [ s * phi, 0,  s]
        ],

        faces: [
            [0, 2, 8],
            [0, 9, 2],
            [0, 8, 4],
            [0, 6, 9],
            [0, 4, 6],

            [1, 10, 3],
            [1, 3, 11],
            [1, 4, 10],
            [1, 11, 6],
            [1, 6, 4],

            [2, 5, 8],
            [2, 9, 7],
            [2, 7, 5],

            [3, 10, 5],
            [3, 7, 11],
            [3, 5, 7],

            [4, 8, 10],
            [5, 10, 8],

            [6, 11, 9],
            [7, 9, 11]
        ]
    };
}
`;

    jsCode += makeMeshEngineCode(
        "getIcosahedronMesh",
        "buildIcosahedron",
        "styleIcosahedron",
        "showStaticIcosahedron",
        "hideStaticIcosahedron",
        "showRotatingIcosahedron",
        "hideRotatingIcosahedron",
        "startIcosahedronRotation",
        "stopIcosahedronRotation",
        "resetIcosahedronRotation",
        180, 180, 180,
        120, 120, 255
    );

    let buttonInstructions =
`Create these GeoGebra buttons.

Button label:
Build icosahedron

On Click JavaScript:
buildIcosahedron();

Button label:
Style icosahedron

On Click JavaScript:
styleIcosahedron();

Button label:
Hide static icosahedron

On Click JavaScript:
hideStaticIcosahedron();

Button label:
Show static icosahedron

On Click JavaScript:
showStaticIcosahedron();

Button label:
Hide rotating icosahedron

On Click JavaScript:
hideRotatingIcosahedron();

Button label:
Show rotating icosahedron

On Click JavaScript:
showRotatingIcosahedron();

Button label:
Start icosahedron rotation

On Click JavaScript:
startIcosahedronRotation();

Button label:
Stop icosahedron rotation

On Click JavaScript:
stopIcosahedronRotation();

Button label:
Reset icosahedron rotation

On Click JavaScript:
resetIcosahedronRotation();
`;

    setOutputs(instructions, jsCode, "", buttonInstructions);
}

function generateGeoGebraDodecahedron() {

    let name = document.getElementById("dodecaName").value;
    let s = document.getElementById("dodecaSize").value;

    let instructions =
`// Dodecahedron construction uses the general GeoGebra mesh engine.
//
// Paste the JavaScript code from the GeoGebra Global JavaScript panel
// into GeoGebra's Global JavaScript section.
//
// Use the GeoGebra Button Setup panel for the required button calls.
//
// Recommended first test:
//
// 1. Run buildDodecahedron();
// 2. Run styleDodecahedron();
// 3. Run hideStaticDodecahedron();
// 4. Run startDodecahedronRotation();
//
// The angle variable 'ang' is created automatically by buildDodecahedron().
// If GeoGebra does not show it as a slider, make 'ang' visible manually
// and set its range to 0 to 360 with increment 1.`;

    let jsCode =
`function getDodecahedronMesh() {

    var s = ${s};
    var phi = (1 + Math.sqrt(5)) / 2;
    var invPhi = 1 / phi;

    return {
        prefix: "${name}",

        vertices: [
            [-s, -s, -s],
            [-s, -s,  s],
            [-s,  s, -s],
            [-s,  s,  s],
            [ s, -s, -s],
            [ s, -s,  s],
            [ s,  s, -s],
            [ s,  s,  s],

            [0, -s * invPhi, -s * phi],
            [0, -s * invPhi,  s * phi],
            [0,  s * invPhi, -s * phi],
            [0,  s * invPhi,  s * phi],

            [-s * invPhi, -s * phi, 0],
            [-s * invPhi,  s * phi, 0],
            [ s * invPhi, -s * phi, 0],
            [ s * invPhi,  s * phi, 0],

            [-s * phi, 0, -s * invPhi],
            [-s * phi, 0,  s * invPhi],
            [ s * phi, 0, -s * invPhi],
            [ s * phi, 0,  s * invPhi]
        ],

        faces: [
            [6, 18, 4, 8, 10],
            [10, 8, 0, 16, 2],
            [1, 12, 0, 16, 17],
            [17, 16, 2, 13, 3],
            [5, 9, 1, 12, 14],
            [14, 12, 0, 8, 4],
            [19, 18, 4, 14, 5],
            [3, 17, 1, 9, 11],
            [11, 9, 5, 19, 7],
            [6, 10, 2, 13, 15],
            [7, 15, 6, 18, 19],
            [15, 13, 3, 11, 7]
        ]
    };
}
`;

    jsCode += makeMeshEngineCode(
        "getDodecahedronMesh",
        "buildDodecahedron",
        "styleDodecahedron",
        "showStaticDodecahedron",
        "hideStaticDodecahedron",
        "showRotatingDodecahedron",
        "hideRotatingDodecahedron",
        "startDodecahedronRotation",
        "stopDodecahedronRotation",
        "resetDodecahedronRotation",
        180, 180, 180,
        180, 120, 255
    );

    let buttonInstructions =
`Create these GeoGebra buttons.

Button label:
Build dodecahedron

On Click JavaScript:
buildDodecahedron();

Button label:
Style dodecahedron

On Click JavaScript:
styleDodecahedron();

Button label:
Hide static dodecahedron

On Click JavaScript:
hideStaticDodecahedron();

Button label:
Show static dodecahedron

On Click JavaScript:
showStaticDodecahedron();

Button label:
Hide rotating dodecahedron

On Click JavaScript:
hideRotatingDodecahedron();

Button label:
Show rotating dodecahedron

On Click JavaScript:
showRotatingDodecahedron();

Button label:
Start dodecahedron rotation

On Click JavaScript:
startDodecahedronRotation();

Button label:
Stop dodecahedron rotation

On Click JavaScript:
stopDodecahedronRotation();

Button label:
Reset dodecahedron rotation

On Click JavaScript:
resetDodecahedronRotation();
`;

    setOutputs(instructions, jsCode, "", buttonInstructions);
}

function generateGeoGebraMobiusStrip() {

    let name = document.getElementById("mobiusName").value;
    let R = document.getElementById("mobiusR").value;
    let w = document.getElementById("mobiusW").value;

    let code =
`${name} = Surface((${R} + v cos(u / 2)) cos(u), (${R} + v cos(u / 2)) sin(u), v sin(u / 2), u, 0, 2*pi, v, -${w}, ${w})`;

    setOutputs(code);
}

function generateGeoGebraCycloid(kind) {
    let name = document.getElementById("cycloidName").value;
    let r = document.getElementById("cycloidR").value;
    let R = document.getElementById("cycloidBigR").value;
    let t = document.getElementById("cycloidParam").value;
    let start = document.getElementById("cycloidStart").value;
    let end = document.getElementById("cycloidEnd").value;

    let code = "";

    if (kind === "cycloid") {
        code =
`${name} = Curve(${r} (${t} - sin(${t})), ${r} (1 - cos(${t})), ${t}, ${start}, ${end})`;
    } else if (kind === "epi") {
        code =
`${name} = Curve((${R} + ${r}) cos(${t}) - ${r} cos(((${R} + ${r}) / ${r}) ${t}), (${R} + ${r}) sin(${t}) - ${r} sin(((${R} + ${r}) / ${r}) ${t}), ${t}, ${start}, ${end})`;
    } else if (kind === "hypo") {
        code =
`${name} = Curve((${R} - ${r}) cos(${t}) + ${r} cos(((${R} - ${r}) / ${r}) ${t}), (${R} - ${r}) sin(${t}) - ${r} sin(((${R} - ${r}) / ${r}) ${t}), ${t}, ${start}, ${end})`;
    }

    setOutputs(code);
}

function generateGeoGebraRotate() {

    let objectName =
        document.getElementById("rotateObject").value;

    let angle =
        document.getElementById("rotateAngle").value;

    let pivot =
        document.getElementById("rotatePivot").value;

    let code =
`RotatedObject = Rotate(${objectName}, ${angle}, ${pivot})`;

    setOutputs(code);
}

function generateGeoGebraTranslate() {
    let objectName = document.getElementById("translateObject").value;
    let vector = document.getElementById("translateVector").value;

    let code =
`TranslatedObject = Translate(${objectName}, ${vector})`;

    setOutputs(code);
}

function generateGeoGebraScale() {
    let objectName = document.getElementById("scaleObject").value;
    let factor = document.getElementById("scaleFactor").value;
    let centre = document.getElementById("scaleCentre").value;

    let code =
`ScaledObject = Dilate(${objectName}, ${factor}, ${centre})`;

    setOutputs(code);
}

function generateGeoGebraReflect() {
    let objectName = document.getElementById("reflectObject").value;
    let mirror = document.getElementById("reflectMirror").value;

    let code =
`ReflectedObject = Reflect(${objectName}, ${mirror})`;

   setOutputs(code);
}

function generateGeoGebraFibonacciSpiral() {

    let instructions =
`// Fibonacci Spiral uses GeoGebra Global JavaScript.
//
// Paste the JavaScript code from the GeoGebra Global JavaScript panel
// into GeoGebra's Global JavaScript section.
//
// Use the GeoGebra Button Setup panel for the required button calls.
//
// Recommended use:
//
// 1. Run setupFibonacciControls();
// 2. Show the created values as sliders if needed.
// 3. Run buildFibonacciSpiral();
// 4. Change the sliders.
// 5. Run buildFibonacciSpiral() again.`;

    let code =
`// GeoGebra Global JavaScript
// Fibonacci Spiral with Coloured Squares

function fmtFib(x) {
    return Number(x.toFixed(4));
}

function clearFibonacciSpiral() {

    for (var i = ggbApplet.getObjectNumber() - 1; i >= 0; i--) {
        try {
            var obj = ggbApplet.getObjectName(i);

            if (obj.indexOf("FIB_") === 0) {
                ggbApplet.deleteObject(obj);
            }
        } catch(e) {}
    }
}

function fibSequence(n) {

    var fib = [];

    if (n >= 1) fib.push(1);
    if (n >= 2) fib.push(1);

    for (var i = 2; i < n; i++) {
        fib.push(fib[i - 1] + fib[i - 2]);
    }

    return fib;
}

function fibPalette(i) {

    var colours = [
        [120, 190, 230], // blue
        [250, 210, 120], // warm yellow
        [150, 215, 160], // green
        [245, 165, 190], // pink
        [175, 170, 230], // violet
        [245, 225, 140], // gold
        [120, 210, 230], // cyan
        [205, 155, 230]  // purple
    ];

    return colours[i % colours.length];
}

function fibSnapshotNames() {

    var before = {};

    for (var i = 0; i < ggbApplet.getObjectNumber(); i++) {
        before[ggbApplet.getObjectName(i)] = true;
    }

    return before;
}

function fibStyleNewObjects(beforeNames, r, g, b, fillLevel) {

    for (var i = 0; i < ggbApplet.getObjectNumber(); i++) {
        try {
            var obj = ggbApplet.getObjectName(i);

            if (!beforeNames[obj]) {

                ggbApplet.setLabelVisible(obj, false);

                var type = "";

                try {
                    type = String(ggbApplet.getObjectType(obj)).toLowerCase();
                } catch(e) {}

                if (type === "point") {
                    ggbApplet.setVisible(obj, false);
                } else {
                    ggbApplet.setColor(obj, r, g, b);

                    try {
                        ggbApplet.setLineThickness(obj, 2);
                    } catch(e) {}

                    if (type === "polygon") {
                        try {
                            ggbApplet.setFilling(obj, fillLevel);
                        } catch(e) {}
                    }
                }
            }
        } catch(e) {}
    }
}

function fibArcData(square) {

    var r = square.size;

    // These choices put the arc in the outward / convex corner
    // of each successive Fibonacci square.

    if (square.dir === "start" || square.dir === "down") {
        return {
            cx: square.x2,
            cy: square.y2,
            r: r,
            t1: Math.PI,
            t2: 3 * Math.PI / 2
        };
    }

    if (square.dir === "right") {
        return {
            cx: square.x1,
            cy: square.y2,
            r: r,
            t1: 3 * Math.PI / 2,
            t2: 2 * Math.PI
        };
    }

    if (square.dir === "up") {
        return {
            cx: square.x1,
            cy: square.y1,
            r: r,
            t1: 0,
            t2: Math.PI / 2
        };
    }

    if (square.dir === "left") {
        return {
            cx: square.x2,
            cy: square.y1,
            r: r,
            t1: Math.PI / 2,
            t2: Math.PI
        };
    }

    return null;
}

function buildFibonacciSpiralWithSquares() {

    clearFibonacciSpiral();

    // Change these if you want more / fewer squares.
    var squareCount = 7;
    var unit = 0.35;

    var fib = fibSequence(squareCount);
    var squares = [];

    // Square 1
    var s1 = fib[0] * unit;
    squares.push({
        x1: 0,
        y1: 0,
        x2: s1,
        y2: s1,
        dir: "start",
        size: s1
    });

    // Square 2
    var s2 = fib[1] * unit;
    squares.push({
        x1: s1,
        y1: 0,
        x2: s1 + s2,
        y2: s2,
        dir: "right",
        size: s2
    });

    var minX = 0;
    var maxX = s1 + s2;
    var minY = 0;
    var maxY = s1;

    var dirs = ["up", "left", "down", "right"];
    var dirIndex = 0;

    for (var i = 2; i < squareCount; i++) {

        var size = fib[i] * unit;
        var dir = dirs[dirIndex % 4];
        var sq;

        if (dir === "up") {
            sq = {
                x1: minX,
                y1: maxY,
                x2: maxX,
                y2: maxY + size,
                dir: "up",
                size: size
            };
            maxY = maxY + size;

        } else if (dir === "left") {
            sq = {
                x1: minX - size,
                y1: minY,
                x2: minX,
                y2: maxY,
                dir: "left",
                size: size
            };
            minX = minX - size;

        } else if (dir === "down") {
            sq = {
                x1: minX,
                y1: minY - size,
                x2: maxX,
                y2: minY,
                dir: "down",
                size: size
            };
            minY = minY - size;

        } else {
            sq = {
                x1: maxX,
                y1: minY,
                x2: maxX + size,
                y2: maxY,
                dir: "right",
                size: size
            };
            maxX = maxX + size;
        }

        squares.push(sq);
        dirIndex++;
    }

    // Draw coloured squares
    for (var j = 0; j < squares.length; j++) {

        var sqr = squares[j];
        var colour = fibPalette(j);
        var before = fibSnapshotNames();
        var squareName = "FIB_SQ_" + (j + 1);

        ggbApplet.evalCommand(
            squareName + " = Polygon((" +
            fmtFib(sqr.x1) + "," + fmtFib(sqr.y1) + "),(" +
            fmtFib(sqr.x2) + "," + fmtFib(sqr.y1) + "),(" +
            fmtFib(sqr.x2) + "," + fmtFib(sqr.y2) + "),(" +
            fmtFib(sqr.x1) + "," + fmtFib(sqr.y2) + "))"
        );

        fibStyleNewObjects(before, colour[0], colour[1], colour[2], 0.55);

        try {
            ggbApplet.setLabelVisible(squareName, false);
            ggbApplet.setColor(squareName, colour[0], colour[1], colour[2]);
            ggbApplet.setFilling(squareName, 0.55);
            ggbApplet.setLineThickness(squareName, 2);
        } catch(e) {}
    }

    // Draw spiral arcs as explicit quarter-circle curves
for (var k = 0; k < squares.length; k++) {

    var sq = squares[k];
    var arc = fibArcData(sq);

    if (!arc) continue;

    var aName = "FIB_A_" + (k + 1);

    ggbApplet.evalCommand(
        aName + " = Curve(" +
        fmtFib(arc.cx) + " + " + fmtFib(arc.r) + " cos(t), " +
        fmtFib(arc.cy) + " + " + fmtFib(arc.r) + " sin(t), " +
        "t, " + fmtFib(arc.t1) + ", " + fmtFib(arc.t2) + ")"
    );

    try {
        ggbApplet.setLabelVisible(aName, false);
        ggbApplet.setColor(aName, 20, 60, 150);
        ggbApplet.setLineThickness(aName, 5);
    } catch(e) {}
}
    // Optional title removed for clean preview capture.
}`;

    let buttonInstructions =
`Create these GeoGebra buttons.

Button label:
Setup Fibonacci controls

On Click JavaScript:
setupFibonacciControls();

Button label:
Build Fibonacci spiral

On Click JavaScript:
buildFibonacciSpiral();
`;

    setOutputs(instructions, code, "", buttonInstructions);
}


function generateGeoGebraFibonacciTiling() {
    let name = document.getElementById("fibName").value;
    let steps = parseInt(document.getElementById("fibSteps").value);
    let scale = parseFloat(document.getElementById("fibScale").value);

    let fib = [1, 1];

    for (let i = 2; i < steps; i++) {
        fib.push(fib[i - 1] + fib[i - 2]);
    }

    let x = 0;
    let y = 0;
    let dx = 1;
    let dy = 0;

    let code = "";

    for (let i = 0; i < steps; i++) {
        let s = fib[i] * scale;

        let squareName = `${name}${i + 1}`;

        code += `${squareName} = Polygon((${fmt(x)}, ${fmt(y)}), (${fmt(x + s)}, ${fmt(y)}), (${fmt(x + s)}, ${fmt(y + s)}), (${fmt(x)}, ${fmt(y + s)}))\n`;

        if (i % 4 === 0) {
            x = x + s;
        } else if (i % 4 === 1) {
            y = y + s;
        } else if (i % 4 === 2) {
            x = x - fib[i + 1] * scale;
        } else if (i % 4 === 3) {
            y = y - fib[i + 1] * scale;
        }
    }

    let jsCode =
    `function hideAllLabels() {
        for (var i = 0; i < ggbApplet.getObjectNumber(); i++) {
            var obj = ggbApplet.getObjectName(i);
            ggbApplet.setLabelVisible(obj, false);
        }
    }`;

    setOutputs(code, jsCode);
}

function setOutputs(commands, code, blenderCode = "", buttonInstructions = "") {
    const commandBox = document.getElementById("ggbCommandOutput");
    const buttonBox = document.getElementById("ggbButtonOutput");
    const jsBox = document.getElementById("ggbJavascriptOutput");
    const blenderBox = document.getElementById("blenderPythonOutput");

    if (commandBox) {
        commandBox.value = commands || "";
    }

    if (buttonBox) {
        buttonBox.value = buttonInstructions || "";
    }

    if (jsBox) {
        jsBox.value = code || "";
    }

    if (blenderBox) {
        blenderBox.value = blenderCode || "";
    }
}

function clearOutputs() {
    setOutputs("", "");
}

function copyCommandsToClipboard() {
    let output = document.getElementById("ggbCommandOutput");
    output.select();
    navigator.clipboard.writeText(output.value);
}

function copyTextAreaToClipboard(textareaId, successMessage) {
    const output = document.getElementById(textareaId);

    if (!output) {
        alert("Output box not found: " + textareaId);
        return;
    }

    output.focus();
    output.select();
    output.setSelectionRange(0, output.value.length);

    const textToCopy = output.value;

    if (!textToCopy) {
        alert("There is no text to copy in: " + textareaId);
        return;
    }

    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy)
            .then(function () {
                alert(successMessage);
            })
            .catch(function () {
                legacyCopyTextArea(output, successMessage);
            });
    } else {
        legacyCopyTextArea(output, successMessage);
    }
}

function legacyCopyTextArea(output, successMessage) {
    try {
        output.focus();
        output.select();
        output.setSelectionRange(0, output.value.length);

        const ok = document.execCommand("copy");

        if (ok) {
            alert(successMessage);
        } else {
            alert("Copy failed. The text has been selected; please press Ctrl+C manually.");
        }
    } catch (err) {
        alert("Copy failed. The text has been selected; please press Ctrl+C manually.");
    }
}

function copyGeoGebraCommands() {
    copyTextAreaToClipboard(
        "ggbCommandOutput",
        "GeoGebra input commands copied to clipboard."
    );
}

function copyGeoGebraButtons() {
    copyTextAreaToClipboard(
        "ggbButtonOutput",
        "GeoGebra button setup copied to clipboard."
    );
}

function copyGeoGebraJavascript() {
    copyTextAreaToClipboard(
        "ggbJavascriptOutput",
        "GeoGebra Global JavaScript copied to clipboard."
    );
}

function copyJavascriptToClipboard() {
    let output = document.getElementById("ggbJavascriptOutput");
    output.select();
    navigator.clipboard.writeText(output.value);
}

function copyBlenderPython() {
    const output = document.getElementById("blenderPythonOutput");

    if (!output) {
        alert("Blender Python output box not found.");
        return;
    }

    output.select();
    output.setSelectionRange(0, 999999);

    navigator.clipboard.writeText(output.value)
        .then(() => {
            alert("Blender Python script copied to clipboard.");
        })
        .catch(() => {
            alert("Copy failed. Please select the text and copy manually.");
        });
}

function showVMFPage(pageId) {
    const designPage = document.getElementById("designPage");
    const codePage = document.getElementById("codePage");

    if (designPage) {
        designPage.style.display = "none";
    }

    if (codePage) {
        codePage.style.display = "none";
    }

    const selectedPage = document.getElementById(pageId);

    if (selectedPage) {
        selectedPage.style.display = "block";
    }
}

function blenderCenterSpherePython(options = {}) {
    const objectName = options.objectName || "SI_CenterSphere";
    const materialName = options.materialName || "SI_Center_Red";
    const parentName = options.parentName || "SI_Rotation_Empty";

    const radius = options.radius ?? 0.45;

    const red = options.red ?? 0.9;
    const green = options.green ?? 0.05;
    const blue = options.blue ?? 0.03;
    const alpha = options.alpha ?? 1.0;

    const roughness = options.roughness ?? 0.25;
    const metallic = options.metallic ?? 0.0;

    return `
# --------------------------------------------------
# Central sphere
# --------------------------------------------------

bpy.ops.mesh.primitive_uv_sphere_add(
    segments=48,
    ring_count=24,
    radius=${radius},
    location=(0, 0, 0)
)

${objectName} = bpy.context.active_object
${objectName}.name = "${objectName}"

${materialName} = make_material(
    "${materialName}",
    (${red}, ${green}, ${blue}, ${alpha}),
    roughness=${roughness},
    metallic=${metallic},
    alpha=${alpha}
)

${objectName}.data.materials.clear()
${objectName}.data.materials.append(${materialName})

if "${parentName}" in bpy.data.objects:
    ${objectName}.parent = bpy.data.objects["${parentName}"]
`;
}

function blenderTorusPython(options = {}) {
    const objectName = options.objectName || "SI_Torus";
    const materialName = options.materialName || "SI_Torus_Orange";
    const parentName = options.parentName || "SI_Rotation_Empty";

    const majorRadius = options.majorRadius ?? 3.0;
    const minorRadius = options.minorRadius ?? 0.10;

    const majorSegments = options.majorSegments ?? 96;
    const minorSegments = options.minorSegments ?? 36;

    const rotX = options.rotX ?? 0.0;
    const rotY = options.rotY ?? 0.0;
    const rotZ = options.rotZ ?? 0.0;

    const red = options.red ?? 0.95;
    const green = options.green ?? 0.55;
    const blue = options.blue ?? 0.10;
    const alpha = options.alpha ?? 0.95;

    const roughness = options.roughness ?? 0.30;
    const metallic = options.metallic ?? 0.05;

    return `
# --------------------------------------------------
# Torus
# --------------------------------------------------

bpy.ops.mesh.primitive_torus_add(
    major_segments=${majorSegments},
    minor_segments=${minorSegments},
    major_radius=${majorRadius},
    minor_radius=${minorRadius},
    location=(0, 0, 0),
    rotation=(${rotX}, ${rotY}, ${rotZ})
)

${objectName} = bpy.context.active_object
${objectName}.name = "${objectName}"

${materialName} = make_material(
    "${materialName}",
    (${red}, ${green}, ${blue}, ${alpha}),
    roughness=${roughness},
    metallic=${metallic},
    alpha=${alpha}
)

${objectName}.data.materials.clear()
${objectName}.data.materials.append(${materialName})

if "${parentName}" in bpy.data.objects:
    ${objectName}.parent = bpy.data.objects["${parentName}"]
`;
}

function generateGeoGebraHilbertCurve() {

    let name = document.getElementById("hilbertName").value;
    let order = document.getElementById("hilbertOrder").value;
    let scale = document.getElementById("hilbertScale").value;

    let instructions =
`// Hilbert Curve uses GeoGebra Global JavaScript.
//
// Paste the JavaScript code from the GeoGebra Global JavaScript panel
// into GeoGebra's Global JavaScript section.
//
// Use the GeoGebra Button Setup panel for the required button calls.
//
// Recommended use:
//
// 1. Run setupHilbertControls();
// 2. Show hilbertOrder and hilbertScale as sliders if needed.
// 3. Set hilbertOrder range to 0 to 5, increment 1.
// 4. Set hilbertScale range to 1 to 12, increment 0.5.
// 5. Run buildHilbert();
// 6. Change the sliders.
// 7. Run buildHilbert() again.
//
// The initial values of hilbertOrder and hilbertScale are taken
// from the framework input boxes above.
//
// Larger order values take longer.
// Recommended normal maximum: order 5.`;

    let jsCode =
`function setupHilbertControls() {

    if (!ggbApplet.exists("hilbertOrder")) {
        ggbApplet.evalCommand("hilbertOrder = ${order}");
        ggbApplet.setLabelVisible("hilbertOrder", true);
    }

    if (!ggbApplet.exists("hilbertScale")) {
        ggbApplet.evalCommand("hilbertScale = ${scale}");
        ggbApplet.setLabelVisible("hilbertScale", true);
    }

    alert(
        "Hilbert controls created.\\n\\n" +
        "If GeoGebra does not show them as sliders, make these objects visible manually:\\n\\n" +
        "hilbertOrder: suggested range 0 to 5, increment 1\\n" +
        "hilbertScale: suggested range 1 to 12, increment 0.5"
    );
}

function buildHilbert() {

    var name = "${name}";

    var order = Math.round(ggbApplet.getValue("hilbertOrder"));
    var scale = ggbApplet.getValue("hilbertScale");

    if (order < 0) {
        order = 0;
    }

    if (order > 6) {
        alert("Order " + order + " is too large for normal GeoGebra use. Using order 6 instead.");
        order = 6;
    }

    if (scale <= 0) {
        alert("Scale must be positive. Using scale ${scale} instead.");
        scale = ${scale};
    }

    var points = [];

    function clearFractal(prefix) {
        for (var i = ggbApplet.getObjectNumber() - 1; i >= 0; i--) {
            var obj = ggbApplet.getObjectName(i);

            if (obj.indexOf(prefix + "_P") === 0 || obj === prefix) {
                ggbApplet.deleteObject(obj);
            }
        }
    }

    clearFractal(name);

    function fmt(x) {
        return Number(x.toFixed(8));
    }

    function hilbert(x0, y0, xi, xj, yi, yj, n) {

        if (n <= 0) {
            var x = x0 + (xi + yi) / 2;
            var y = y0 + (xj + yj) / 2;

            points.push([x, y]);
            return;
        }

        hilbert(
            x0,
            y0,
            yi / 2,
            yj / 2,
            xi / 2,
            xj / 2,
            n - 1
        );

        hilbert(
            x0 + xi / 2,
            y0 + xj / 2,
            xi / 2,
            xj / 2,
            yi / 2,
            yj / 2,
            n - 1
        );

        hilbert(
            x0 + xi / 2 + yi / 2,
            y0 + xj / 2 + yj / 2,
            xi / 2,
            xj / 2,
            yi / 2,
            yj / 2,
            n - 1
        );

        hilbert(
            x0 + xi / 2 + yi,
            y0 + xj / 2 + yj,
            -yi / 2,
            -yj / 2,
            -xi / 2,
            -xj / 2,
            n - 1
        );
    }

    hilbert(0, 0, scale, 0, 0, scale, order);

    for (var i = 0; i < points.length; i++) {
        var pName = name + "_P" + i;

        ggbApplet.evalCommand(
            pName + " = (" +
            fmt(points[i][0]) + "," +
            fmt(points[i][1]) + ")"
        );

        ggbApplet.setVisible(pName, false);
        ggbApplet.setLabelVisible(pName, false);
    }

    var beforeNames = {};

    for (var b = 0; b < ggbApplet.getObjectNumber(); b++) {
        beforeNames[ggbApplet.getObjectName(b)] = true;
    }

    var cmd = name + " = Polyline(";

    for (var j = 0; j < points.length; j++) {
        cmd += name + "_P" + j;

        if (j < points.length - 1) {
            cmd += ",";
        }
    }

    cmd += ")";

    ggbApplet.evalCommand(cmd);

    // Hide labels and style every new object created by the Polyline command.
    for (var k = 0; k < ggbApplet.getObjectNumber(); k++) {
        try {
            var obj = ggbApplet.getObjectName(k);

            if (!beforeNames[obj]) {
                ggbApplet.setLabelVisible(obj, false);
                ggbApplet.setColor(obj, 90, 90, 220);
                ggbApplet.setLineThickness(obj, 3);
            }
        } catch(e) {}
    }

    // Also re-hide and style the named curve itself.
    try {
        ggbApplet.setLabelVisible(name, false);
        ggbApplet.setColor(name, 90, 90, 220);
        ggbApplet.setLineThickness(name, 3);
    } catch(e) {}

    // Final safety pass: hide labels on all Hilbert point objects.
    for (var m = 0; m < points.length; m++) {
        try {
            ggbApplet.setLabelVisible(name + "_P" + m, false);
            ggbApplet.setVisible(name + "_P" + m, false);
        } catch(e) {}
    }
}`;

    let buttonInstructions =
`Create these GeoGebra buttons.

Button label:
Setup Hilbert controls

On Click JavaScript:
setupHilbertControls();

Button label:
Build Hilbert curve

On Click JavaScript:
buildHilbert();
`;

    setOutputs(instructions, jsCode, "", buttonInstructions);
}

function generateGeoGebraKochCurve() {

    let name = document.getElementById("hilbertName").value;
    let order = document.getElementById("hilbertOrder").value;
    let scale = document.getElementById("hilbertScale").value;

    let instructions =
`// Koch Curve uses GeoGebra Global JavaScript.
//
// Paste the JavaScript code from the GeoGebra Global JavaScript panel
// into GeoGebra's Global JavaScript section.
//
// Use the GeoGebra Button Setup panel for the required button calls.
//
// Recommended use:
//
// 1. Run setupKochCurveControls();
// 2. Show kochCurveOrder and kochCurveScale as sliders if needed.
// 3. Set kochCurveOrder range to 0 to 4.5, increment 0.5.
// 4. Set kochCurveScale range to 1 to 12, increment 0.5.
// 5. Run buildKochCurve();
// 6. Change the sliders.
// 7. Run buildKochCurve() again.
//
// The initial values of kochCurveOrder and kochCurveScale are taken
// from the framework input boxes above.
//
// Larger order values take longer.
// Recommended normal maximum: order 5.`;

    let jsCode =
`function setupKochCurveControls() {

    if (!ggbApplet.exists("kochCurveOrder")) {
        ggbApplet.evalCommand("kochCurveOrder = ${order}");
        ggbApplet.setLabelVisible("kochCurveOrder", true);
    }

    if (!ggbApplet.exists("kochCurveScale")) {
        ggbApplet.evalCommand("kochCurveScale = ${scale}");
        ggbApplet.setLabelVisible("kochCurveScale", true);
    }

    alert(
        "Koch Curve controls created.\\n\\n" +
        "If GeoGebra does not show them as sliders, make these objects visible manually:\\n\\n" +
        "kochCurveOrder: suggested range 0 to 4.5, increment 0.5\\n" +
        "kochCurveScale: suggested range 1 to 12, increment 0.5"
    );
}

function buildKochCurve() {

    var name = "${name}";

    var order = Math.round(ggbApplet.getValue("kochCurveOrder"));
    var scale = ggbApplet.getValue("kochCurveScale");

    if (order < 0) {
        order = 0;
    }

    if (order > 6) {
        alert("Order " + order + " is too large for normal GeoGebra use. Using order 6 instead.");
        order = 6;
    }

    if (scale <= 0) {
        alert("Scale must be positive. Using scale ${scale} instead.");
        scale = ${scale};
    }

    var points = [];

    function clearFractal(prefix) {
        for (var i = ggbApplet.getObjectNumber() - 1; i >= 0; i--) {
            var obj = ggbApplet.getObjectName(i);

            if (obj.indexOf(prefix + "_P") === 0 || obj === prefix) {
                ggbApplet.deleteObject(obj);
            }
        }
    }

    clearFractal(name);

    function fmt(x) {
        return Number(x.toFixed(8));
    }

    function koch(x1, y1, x2, y2, n) {

        if (n <= 0) {
            points.push([x1, y1]);
            return;
        }

        var dx = (x2 - x1) / 3;
        var dy = (y2 - y1) / 3;

        var ax = x1 + dx;
        var ay = y1 + dy;

        var bx = x1 + 2 * dx;
        var by = y1 + 2 * dy;

        var angle = Math.PI / 3;

        var px = ax + dx * Math.cos(angle) - dy * Math.sin(angle);
        var py = ay + dx * Math.sin(angle) + dy * Math.cos(angle);

        koch(x1, y1, ax, ay, n - 1);
        koch(ax, ay, px, py, n - 1);
        koch(px, py, bx, by, n - 1);
        koch(bx, by, x2, y2, n - 1);
    }

    var A = [0, 0];
    var B = [scale, 0];

    koch(A[0], A[1], B[0], B[1], order);

    points.push(B);

    for (var i = 0; i < points.length; i++) {
        var pName = name + "_P" + i;

        ggbApplet.evalCommand(
            pName + " = (" +
            fmt(points[i][0]) + "," +
            fmt(points[i][1]) + ")"
        );

        ggbApplet.setVisible(pName, false);
        ggbApplet.setLabelVisible(pName, false);
    }

    var beforeNames = {};

    for (var b = 0; b < ggbApplet.getObjectNumber(); b++) {
        beforeNames[ggbApplet.getObjectName(b)] = true;
    }

    var cmd = name + " = Polyline(";

    for (var j = 0; j < points.length; j++) {
        cmd += name + "_P" + j;

        if (j < points.length - 1) {
            cmd += ",";
        }
    }

    cmd += ")";

    ggbApplet.evalCommand(cmd);

    // Hide labels and style every new object created by the Polyline command.
    for (var k = 0; k < ggbApplet.getObjectNumber(); k++) {
        try {
            var obj = ggbApplet.getObjectName(k);

            if (!beforeNames[obj]) {
                ggbApplet.setLabelVisible(obj, false);
                ggbApplet.setColor(obj, 40, 140, 80);
                ggbApplet.setLineThickness(obj, 3);
            }
        } catch(e) {}
    }

    // Also re-hide and style the named curve itself.
    try {
        ggbApplet.setLabelVisible(name, false);
        ggbApplet.setColor(name, 40, 140, 80);
        ggbApplet.setLineThickness(name, 3);
    } catch(e) {}

    // Final safety pass: hide labels on all Koch Curve point objects.
    for (var m = 0; m < points.length; m++) {
        try {
            ggbApplet.setLabelVisible(name + "_P" + m, false);
            ggbApplet.setVisible(name + "_P" + m, false);
        } catch(e) {}
    }
}`;

    let buttonInstructions =
`Create these GeoGebra buttons.

Button label:
Setup Koch curve controls

On Click JavaScript:
setupKochCurveControls();

Button label:
Build Koch curve

On Click JavaScript:
buildKochCurve();
`;

    setOutputs(instructions, jsCode, "", buttonInstructions);
}

function generateGeoGebraKochSnowflake() {

    let name = document.getElementById("hilbertName").value;
    let order = document.getElementById("hilbertOrder").value;
    let scale = document.getElementById("hilbertScale").value;

    let instructions =
`// Koch Snowflake uses GeoGebra Global JavaScript.
//
// Paste the JavaScript code from the GeoGebra Global JavaScript panel
// into GeoGebra's Global JavaScript section.
//
// Use the GeoGebra Button Setup panel for the required button calls.
//
// Recommended use:
//
// 1. Run setupKochControls();
// 2. Show kochOrder and kochScale as sliders if needed.
// 3. Set kochOrder range to 0 to 4.5, increment 0.5.
// 4. Set kochScale range to 1 to 12, increment 0.5.
// 5. Run buildKochSnowflake();
// 6. Change the sliders.
// 7. Run buildKochSnowflake() again.
//
// The initial values of kochOrder and kochScale are taken
// from the framework input boxes above.
//
// Larger order values take longer.
// Recommended normal maximum: order 5.
// Use order 6 only as an occasional stress test.`;

    let jsCode =
`function setupKochControls() {

    if (!ggbApplet.exists("kochOrder")) {
        ggbApplet.evalCommand("kochOrder = ${order}");
        ggbApplet.setLabelVisible("kochOrder", true);
    }

    if (!ggbApplet.exists("kochScale")) {
        ggbApplet.evalCommand("kochScale = ${scale}");
        ggbApplet.setLabelVisible("kochScale", true);
    }

    alert(
        "Koch Snowflake controls created.\\n\\n" +
        "If GeoGebra does not show them as sliders, make these objects visible manually:\\n\\n" +
        "kochOrder: suggested range 0 to 4.5, increment 0.5\\n" +
        "kochScale: suggested range 1 to 12, increment 0.5"
    );
}

function buildKochSnowflake() {

    var name = "${name}";

    var order = Math.round(ggbApplet.getValue("kochOrder"));
    var scale = ggbApplet.getValue("kochScale");

    if (order < 0) {
        order = 0;
    }

    if (order > 6) {
        alert("Order " + order + " is too large for normal GeoGebra use. Using order 6 instead.");
        order = 6;
    }

    if (scale <= 0) {
        alert("Scale must be positive. Using scale ${scale} instead.");
        scale = ${scale};
    }

    var points = [];

    function clearFractal(prefix) {
        for (var i = ggbApplet.getObjectNumber() - 1; i >= 0; i--) {
            var obj = ggbApplet.getObjectName(i);

            if (obj.indexOf(prefix + "_P") === 0 || obj === prefix) {
                ggbApplet.deleteObject(obj);
            }
        }
    }

    clearFractal(name);

    function fmt(x) {
        return Number(x.toFixed(8));
    }

    function koch(x1, y1, x2, y2, n) {

        if (n <= 0) {
            points.push([x1, y1]);
            return;
        }

        var dx = (x2 - x1) / 3;
        var dy = (y2 - y1) / 3;

        var ax = x1 + dx;
        var ay = y1 + dy;

        var bx = x1 + 2 * dx;
        var by = y1 + 2 * dy;

        var angle = -Math.PI / 3;

        var px = ax + dx * Math.cos(angle) - dy * Math.sin(angle);
        var py = ay + dx * Math.sin(angle) + dy * Math.cos(angle);

        koch(x1, y1, ax, ay, n - 1);
        koch(ax, ay, px, py, n - 1);
        koch(px, py, bx, by, n - 1);
        koch(bx, by, x2, y2, n - 1);
    }

    var h = scale * Math.sqrt(3) / 2;

    var A = [0, 0];
    var B = [scale, 0];
    var C = [scale / 2, h];

    koch(A[0], A[1], B[0], B[1], order);
    koch(B[0], B[1], C[0], C[1], order);
    koch(C[0], C[1], A[0], A[1], order);

    points.push(A);

    for (var i = 0; i < points.length; i++) {
        var pName = name + "_P" + i;

        ggbApplet.evalCommand(
            pName + " = (" +
            fmt(points[i][0]) + "," +
            fmt(points[i][1]) + ")"
        );

        ggbApplet.setVisible(pName, false);
        ggbApplet.setLabelVisible(pName, false);
    }

    var beforeNames = {};

    for (var b = 0; b < ggbApplet.getObjectNumber(); b++) {
        beforeNames[ggbApplet.getObjectName(b)] = true;
    }

    var cmd = name + " = Polyline(";

    for (var j = 0; j < points.length; j++) {
        cmd += name + "_P" + j;

        if (j < points.length - 1) {
            cmd += ",";
        }
    }

    cmd += ")";

    ggbApplet.evalCommand(cmd);

    // Hide labels and style every new object created by the Polyline command.
    for (var k = 0; k < ggbApplet.getObjectNumber(); k++) {
        try {
            var obj = ggbApplet.getObjectName(k);

            if (!beforeNames[obj]) {
                ggbApplet.setLabelVisible(obj, false);
                ggbApplet.setColor(obj, 70, 160, 240);
                ggbApplet.setLineThickness(obj, 3);
            }
        } catch(e) {}
    }

    // Also re-hide and style the named snowflake itself.
    try {
        ggbApplet.setLabelVisible(name, false);
        ggbApplet.setColor(name, 70, 160, 240);
        ggbApplet.setLineThickness(name, 3);
    } catch(e) {}

    // Final safety pass: hide labels on all Koch Snowflake point objects.
    for (var m = 0; m < points.length; m++) {
        try {
            ggbApplet.setLabelVisible(name + "_P" + m, false);
            ggbApplet.setVisible(name + "_P" + m, false);
        } catch(e) {}
    }
}`;

    let buttonInstructions =
`Create these GeoGebra buttons.

Button label:
Setup Koch snowflake controls

On Click JavaScript:
setupKochControls();

Button label:
Build Koch snowflake

On Click JavaScript:
buildKochSnowflake();
`;

    setOutputs(instructions, jsCode, "", buttonInstructions);
}

function generateGeoGebraSierpinskiTriangle() {

    let name = document.getElementById("hilbertName").value;
    let order = document.getElementById("hilbertOrder").value;
    let scale = document.getElementById("hilbertScale").value;

    let instructions =
`// Sierpinski Triangle uses GeoGebra Global JavaScript.
//
// Paste the JavaScript code from the GeoGebra Global JavaScript panel
// into GeoGebra's Global JavaScript section.
//
// Use the GeoGebra Button Setup panel for the required button calls.
//
// Recommended use:
//
// 1. Run setupSierpinskiControls();
// 2. Show sierpinskiOrder and sierpinskiScale as sliders if needed.
// 3. Set sierpinskiOrder range to 0 to 6, increment 1.
// 4. Set sierpinskiScale range to 1 to 12, increment 0.5.
// 5. Run buildSierpinski();
// 6. Change the sliders.
// 7. Run buildSierpinski() again.
//
// The initial values of sierpinskiOrder and sierpinskiScale are taken
// from the framework input boxes above.
//
// Larger order values take longer.
// Recommended normal maximum: order 6.`;

    let jsCode =
`function setupSierpinskiControls() {

    if (!ggbApplet.exists("sierpinskiOrder")) {
        ggbApplet.evalCommand("sierpinskiOrder = ${order}");
        ggbApplet.setLabelVisible("sierpinskiOrder", true);
    }

    if (!ggbApplet.exists("sierpinskiScale")) {
        ggbApplet.evalCommand("sierpinskiScale = ${scale}");
        ggbApplet.setLabelVisible("sierpinskiScale", true);
    }

    alert(
        "Sierpinski controls created.\\n\\n" +
        "If GeoGebra does not show them as sliders, make these objects visible manually:\\n\\n" +
        "sierpinskiOrder: suggested range 0 to 6, increment 1\\n" +
        "sierpinskiScale: suggested range 1 to 12, increment 0.5"
    );
}

function buildSierpinski() {

    var name = "${name}";

    var order = Math.round(ggbApplet.getValue("sierpinskiOrder"));
    var scale = ggbApplet.getValue("sierpinskiScale");

    if (order < 0) {
        order = 0;
    }

    if (order > 7) {
        alert("Order " + order + " is too large for normal GeoGebra use. Using order 7 instead.");
        order = 7;
    }

    if (scale <= 0) {
        alert("Scale must be positive. Using scale ${scale} instead.");
        scale = ${scale};
    }

    var triCount = 0;
    var pointCount = 0;

    function clearFractal(prefix) {
        for (var i = ggbApplet.getObjectNumber() - 1; i >= 0; i--) {
            var obj = ggbApplet.getObjectName(i);

            if (obj.indexOf(prefix + "_") === 0 || obj === prefix) {
                ggbApplet.deleteObject(obj);
            }
        }
    }

    clearFractal(name);

    function fmt(x) {
        return Number(x.toFixed(8));
    }

    function midpoint(P, Q) {
        return [(P[0] + Q[0]) / 2, (P[1] + Q[1]) / 2];
    }

    function drawTriangle(A, B, C) {

        var pA = name + "_P" + (pointCount++);
        var pB = name + "_P" + (pointCount++);
        var pC = name + "_P" + (pointCount++);
        var tName = name + "_T" + (triCount++);

        ggbApplet.evalCommand(pA + " = (" + fmt(A[0]) + "," + fmt(A[1]) + ")");
        ggbApplet.evalCommand(pB + " = (" + fmt(B[0]) + "," + fmt(B[1]) + ")");
        ggbApplet.evalCommand(pC + " = (" + fmt(C[0]) + "," + fmt(C[1]) + ")");

        ggbApplet.setVisible(pA, false);
        ggbApplet.setVisible(pB, false);
        ggbApplet.setVisible(pC, false);

        ggbApplet.setLabelVisible(pA, false);
        ggbApplet.setLabelVisible(pB, false);
        ggbApplet.setLabelVisible(pC, false);

        ggbApplet.evalCommand(tName + " = Polygon(" + pA + "," + pB + "," + pC + ")");
        ggbApplet.setColor(tName, 90, 140, 240);
        ggbApplet.setFilling(tName, 0.45);
        ggbApplet.setLineThickness(tName, 1);
        ggbApplet.setLabelVisible(tName, false);
    }

    function sierpinski(A, B, C, n) {

        if (n <= 0) {
            drawTriangle(A, B, C);
            return;
        }

        var AB = midpoint(A, B);
        var BC = midpoint(B, C);
        var CA = midpoint(C, A);

        sierpinski(A, AB, CA, n - 1);
        sierpinski(AB, B, BC, n - 1);
        sierpinski(CA, BC, C, n - 1);
    }

    var h = scale * Math.sqrt(3) / 2;

    var A = [0, 0];
    var B = [scale, 0];
    var C = [scale / 2, h];

    sierpinski(A, B, C, order);
}`;

    let buttonInstructions =
`Create these GeoGebra buttons.

Button label:
Setup Sierpinski controls

On Click JavaScript:
setupSierpinskiControls();

Button label:
Build Sierpinski triangle

On Click JavaScript:
buildSierpinski();
`;

    setOutputs(instructions, jsCode, "", buttonInstructions);
}

function generateGeoGebraBirthDeathProcess() {

    let initial = document.getElementById("bdInitial").value;
    let lambda = document.getElementById("bdLambda").value;
    let mu = document.getElementById("bdMu").value;
    let maxTime = document.getElementById("bdMaxTime").value;
    let maxEvents = document.getElementById("bdMaxEvents").value;

    let commandCode =
`// Paste the JavaScript below into GeoGebra Global JavaScript.
// Use the GeoGebra Button Setup panel for the required button calls.
`;

    let jsCode =
`function runBirthDeath() {

    var initial = ${initial};
    var lambda = ${lambda};
    var mu = ${mu};
    var maxTime = ${maxTime};
    var maxEvents = ${maxEvents};

    var t = 0;
    var N = initial;
    var maxPopulation = N;

    var points = [];
    points.push([t, N]);

    function expWait(rate) {
        return -Math.log(Math.random()) / rate;
    }

    function fmt(x) {
        return Number(x.toFixed(6));
    }

    var eventCount = 0;

    while (t < maxTime && N > 0 && eventCount < maxEvents) {

        var totalRate = N * (lambda + mu);
        var dt = expWait(totalRate);
        var newTime = t + dt;

        if (newTime > maxTime) {
            points.push([maxTime, N]);
            break;
        }

        var oldN = N;

        points.push([newTime, oldN]);

        var u = Math.random();

        if (u < lambda / (lambda + mu)) {
            N = N + 1;
        } else {
            N = N - 1;
        }

        points.push([newTime, N]);

        t = newTime;
        eventCount++;

        if (N > maxPopulation) {
            maxPopulation = N;
        }
    }

    if (N > 0 && t < maxTime) {
        points.push([maxTime, N]);
    }

    clearBirthDeath();

    for (var i = 0; i < points.length; i++) {
        var pName = "BD_P" + i;

        ggbApplet.evalCommand(
            pName + " = (" +
            fmt(points[i][0]) + "," +
            points[i][1] + ")"
        );

        ggbApplet.setVisible(pName, false);
        ggbApplet.setLabelVisible(pName, false);
    }

    var cmd = "BD_Path = Polyline(";

    for (var j = 0; j < points.length; j++) {
        cmd += "BD_P" + j;

        if (j < points.length - 1) {
            cmd += ",";
        }
    }

    cmd += ")";

    ggbApplet.evalCommand(cmd);
    ggbApplet.setColor("BD_Path", 180, 0, 180);
    ggbApplet.setLineThickness("BD_Path", 4);
    ggbApplet.setLabelVisible("BD_Path", false);

    ggbApplet.evalCommand("BDFinalPopulation = " + N);
    ggbApplet.evalCommand("BDEvents = " + eventCount);
    ggbApplet.evalCommand("BDMaxPopulation = " + maxPopulation);
    ggbApplet.evalCommand("BDExtinct = " + (N === 0 ? 1 : 0));
}

function clearBirthDeath() {
    for (var i = ggbApplet.getObjectNumber() - 1; i >= 0; i--) {
        var obj = ggbApplet.getObjectName(i);

        if (obj.indexOf("BD_") === 0) {
            ggbApplet.deleteObject(obj);
        }
    }

    try { ggbApplet.deleteObject("BDFinalPopulation"); } catch(e) {}
    try { ggbApplet.deleteObject("BDEvents"); } catch(e) {}
    try { ggbApplet.deleteObject("BDMaxPopulation"); } catch(e) {}
    try { ggbApplet.deleteObject("BDExtinct"); } catch(e) {}
}`;

    const buttonInstructions =
`Create these GeoGebra buttons.

Button label:
Run birth-death process

On Click JavaScript:
runBirthDeathProcess();

Button label:
Clear

On Click JavaScript:
clearBirthDeathProcess();
`;

    setOutputs(commandCode, jsCode, "", buttonInstructions);
}

function generateGeoGebraBirthDeathStats() {

    let initial = document.getElementById("bdStatsInitial").value;
    let lambda = document.getElementById("bdStatsLambda").value;
    let mu = document.getElementById("bdStatsMu").value;
    let maxTime = document.getElementById("bdStatsMaxTime").value;
    let maxEvents = document.getElementById("bdStatsMaxEvents").value;
    let trials = document.getElementById("bdStatsTrials").value;

    let commandCode =
`// Paste the JavaScript below into GeoGebra Global JavaScript.
// Use the GeoGebra Button Setup panel for the required button calls.
`;

    let jsCode =
`function runBirthDeathStats() {

    var initial = 1;
    var lambda = 0.8;
    var mu = 0.6;
    var maxTime = 20;
    var maxEvents = 500;
    var trials = 1000;

    function fmt(x) {
        return Number(x.toFixed(6));
    }

    function expWait(rate) {
        return -Math.log(Math.random()) / rate;
    }

    function simulateOne() {

        var t = 0;
        var N = initial;
        var maxPopulation = N;
        var eventCount = 0;
        var capped = false;
        var extinctionTime = 0;

        while (t < maxTime && N > 0 && eventCount < maxEvents) {

            var totalRate = N * (lambda + mu);
            var dt = expWait(totalRate);
            var newTime = t + dt;

            if (newTime > maxTime) {
                break;
            }

            var u = Math.random();

            if (u < lambda / (lambda + mu)) {
                N = N + 1;
            } else {
                N = N - 1;
            }

            t = newTime;
            eventCount++;

            if (N > maxPopulation) {
                maxPopulation = N;
            }

            if (N === 0) {
                extinctionTime = t;
                break;
            }
        }

        if (eventCount >= maxEvents && t < maxTime && N > 0) {
            capped = true;
        }

        return {
            finalPopulation: N,
            maxPopulation: maxPopulation,
            eventCount: eventCount,
            extinct: (N === 0 ? 1 : 0),
            capped: (capped ? 1 : 0),
            extinctionTime: extinctionTime
        };
    }

    /*
       Important:
       We do NOT delete the BDStat... variables here.
       The dashboard bars and text labels depend on them.
       Each run simply updates their values.
    */

    var extinctions = 0;
    var sumFinalPopulation = 0;
    var sumMaxPopulation = 0;
    var sumEvents = 0;
    var cappedRuns = 0;

    var sumExtinctionTime = 0;
    var maxExtinctionTime = 0;

    for (var r = 0; r < trials; r++) {

        var result = simulateOne();

        extinctions += result.extinct;
        sumFinalPopulation += result.finalPopulation;
        sumMaxPopulation += result.maxPopulation;
        sumEvents += result.eventCount;
        cappedRuns += result.capped;

        if (result.extinct === 1) {
            sumExtinctionTime += result.extinctionTime;

            if (result.extinctionTime > maxExtinctionTime) {
                maxExtinctionTime = result.extinctionTime;
            }
        }
    }

    var survivals = trials - extinctions;

    var extinctionRate = extinctions / trials;
    var survivalRate = survivals / trials;
    var cappedRate = cappedRuns / trials;

    var meanFinalPopulation = sumFinalPopulation / trials;
    var meanMaxPopulation = sumMaxPopulation / trials;
    var meanEvents = sumEvents / trials;

    var meanExtinctionTime = 0;

    if (extinctions > 0) {
        meanExtinctionTime = sumExtinctionTime / extinctions;
    }

    ggbApplet.evalCommand("BDStatTrials = " + trials);
    ggbApplet.evalCommand("BDStatExtinctions = " + extinctions);
    ggbApplet.evalCommand("BDStatSurvivals = " + survivals);

    ggbApplet.evalCommand("BDStatExtinctionRate = " + fmt(extinctionRate));
    ggbApplet.evalCommand("BDStatSurvivalRate = " + fmt(survivalRate));

    ggbApplet.evalCommand("BDStatMeanFinalPopulation = " + fmt(meanFinalPopulation));
    ggbApplet.evalCommand("BDStatMeanMaxPopulation = " + fmt(meanMaxPopulation));
    ggbApplet.evalCommand("BDStatMeanEvents = " + fmt(meanEvents));

    ggbApplet.evalCommand("BDStatCappedRuns = " + cappedRuns);
    ggbApplet.evalCommand("BDStatCappedRate = " + fmt(cappedRate));

    ggbApplet.evalCommand("BDStatMeanExtinctionTime = " + fmt(meanExtinctionTime));
    ggbApplet.evalCommand("BDStatMaxExtinctionTime = " + fmt(maxExtinctionTime));

    ggbApplet.evalCommand("BDStatInitialPopulation = " + initial);
    ggbApplet.evalCommand("BDStatBirthRate = " + lambda);
    ggbApplet.evalCommand("BDStatDeathRate = " + mu);
    ggbApplet.evalCommand("BDStatMaxTime = " + maxTime);
    ggbApplet.evalCommand("BDStatMaxEvents = " + maxEvents);
}

function clearBirthDeathStats() {

    var names = [
        "BDStatTrials",
        "BDStatExtinctions",
        "BDStatSurvivals",
        "BDStatExtinctionRate",
        "BDStatSurvivalRate",
        "BDStatMeanFinalPopulation",
        "BDStatMeanMaxPopulation",
        "BDStatMeanEvents",
        "BDStatCappedRuns",
        "BDStatCappedRate",
        "BDStatMeanExtinctionTime",
        "BDStatMaxExtinctionTime",
        "BDStatInitialPopulation",
        "BDStatBirthRate",
        "BDStatDeathRate",
        "BDStatMaxTime",
        "BDStatMaxEvents"
    ];

    for (var i = 0; i < names.length; i++) {
        try {
            ggbApplet.deleteObject(names[i]);
        } catch(e) {}
    }
}`;

    const buttonInstructions =
`Create these GeoGebra buttons.

Button label:
Run extinction statistics

On Click JavaScript:
runBirthDeathStatistics();

Button label:
Clear statistics

On Click JavaScript:
clearBirthDeathStatistics();
`;

    setOutputs(commandCode, jsCode, "", buttonInstructions);
}

function generateGeoGebraBirthDeathSamplePaths() {

    let initial = document.getElementById("bdPathsInitial").value;
    let lambda = document.getElementById("bdPathsLambda").value;
    let mu = document.getElementById("bdPathsMu").value;
    let maxTime = document.getElementById("bdPathsMaxTime").value;
    let maxEvents = document.getElementById("bdPathsMaxEvents").value;
    let pathCount = document.getElementById("bdPathsCount").value;

    let commandCode =
`// Paste the JavaScript below into GeoGebra Global JavaScript.
// Use the GeoGebra Button Setup panel for the required button calls.
`;

    let jsCode =
`function runBirthDeathSamplePaths() {

    var initial = ${initial};
    var lambda = ${lambda};
    var mu = ${mu};
    var maxTime = ${maxTime};
    var maxEvents = ${maxEvents};
    var pathCount = ${pathCount};

    function fmt(x) {
        return Number(x.toFixed(6));
    }

    function expWait(rate) {
        return -Math.log(Math.random()) / rate;
    }

    clearBirthDeathSamplePaths();

    var extinctCount = 0;
    var maxObservedPopulation = initial;
    var cappedCount = 0;

    function simulatePath(pathIndex) {

        var t = 0;
        var N = initial;
        var eventCount = 0;
        var capped = false;
        var points = [];

        points.push([t, N]);

        while (t < maxTime && N > 0 && eventCount < maxEvents) {

            var totalRate = N * (lambda + mu);
            var dt = expWait(totalRate);
            var newTime = t + dt;

            if (newTime > maxTime) {
                points.push([maxTime, N]);
                break;
            }

            var oldN = N;

            points.push([newTime, oldN]);

            var u = Math.random();

            if (u < lambda / (lambda + mu)) {
                N = N + 1;
            } else {
                N = N - 1;
            }

            points.push([newTime, N]);

            t = newTime;
            eventCount++;

            if (N > maxObservedPopulation) {
                maxObservedPopulation = N;
            }
        }

        if (eventCount >= maxEvents && t < maxTime && N > 0) {
            capped = true;
            cappedCount++;
            points.push([maxTime, N]);
        }

        if (N === 0) {
            extinctCount++;
        }

        if (N > 0 && t < maxTime && capped === false) {
            points.push([maxTime, N]);
        }

        var cmd = "BDPath_" + pathIndex + " = Polyline(";

        for (var j = 0; j < points.length; j++) {
            cmd += "(" + fmt(points[j][0]) + "," + points[j][1] + ")";

            if (j < points.length - 1) {
                cmd += ",";
            }
        }

        cmd += ")";

        ggbApplet.evalCommand(cmd);

        var pathName = "BDPath_" + pathIndex;

        ggbApplet.setColor(pathName, 200, 80, 200);
        ggbApplet.setLineThickness(pathName, 1);
        ggbApplet.setLabelVisible(pathName, false);
    }

    for (var p = 0; p < pathCount; p++) {
        simulatePath(p);
    }

    ggbApplet.evalCommand("BDPathsCount = " + pathCount);
    ggbApplet.evalCommand("BDPathsExtinctions = " + extinctCount);
    ggbApplet.evalCommand("BDPathsExtinctionRate = " + fmt(extinctCount / pathCount));
    ggbApplet.evalCommand("BDPathsMaxObservedPopulation = " + maxObservedPopulation);
    ggbApplet.evalCommand("BDPathsCappedRuns = " + cappedCount);
}

function clearBirthDeathSamplePaths() {
    for (var i = ggbApplet.getObjectNumber() - 1; i >= 0; i--) {
        var obj = ggbApplet.getObjectName(i);

        if (obj.indexOf("BDPath_") === 0) {
            ggbApplet.deleteObject(obj);
        }
    }

    try { ggbApplet.deleteObject("BDPathsCount"); } catch(e) {}
    try { ggbApplet.deleteObject("BDPathsExtinctions"); } catch(e) {}
    try { ggbApplet.deleteObject("BDPathsExtinctionRate"); } catch(e) {}
    try { ggbApplet.deleteObject("BDPathsMaxObservedPopulation"); } catch(e) {}
    try { ggbApplet.deleteObject("BDPathsCappedRuns"); } catch(e) {}
}`;

    const buttonInstructions =
`Create these GeoGebra buttons.

Button label:
Run sample paths

On Click JavaScript:
runBirthDeathSamplePaths();

Button label:
Clear sample paths

On Click JavaScript:
clearBirthDeathSamplePaths();
`;

    setOutputs(commandCode, jsCode, "", buttonInstructions);
}

function generateGeoGebraMobiusStrip() {

    let name = document.getElementById("mobiusName").value;
    let R = document.getElementById("mobiusR").value;
    let w = document.getElementById("mobiusW").value;

    let code =
`${name} = Surface((${R} + v cos(u / 2)) cos(u), (${R} + v cos(u / 2)) sin(u), v sin(u / 2), u, 0, 2*pi, v, -${w}, ${w})`;

    setOutputs(code);
}

function generateGeoGebraHelix() {

    let name = document.getElementById("helixName").value;
    let radius = document.getElementById("helixRadius").value;
    let pitch = document.getElementById("helixPitch").value;
    let turns = document.getElementById("helixTurns").value;
    let t = document.getElementById("helixParam").value;

    let endValue = `${turns} * 2 * pi`;

    let commands =
`${name} = Curve(${radius} cos(${t}), ${radius} sin(${t}), ${pitch} ${t}, ${t}, 0, ${endValue})`;

    let code =
`// No GeoGebra Global JavaScript is required for this Helix.
// Use the GeoGebra Input Command panel above.`;

    let blenderCode =
`# Blender Python
# Simple helix curve

import bpy
import math

name = "${name}"
radius = ${radius}
pitch = ${pitch}
turns = ${turns}
samples = 300

# Remove previous helix object
for obj in list(bpy.data.objects):
    if obj.name.startswith(name):
        bpy.data.objects.remove(obj, do_unlink=True)

curve = bpy.data.curves.new(name, type="CURVE")
curve.dimensions = "3D"
curve.resolution_u = 2
curve.bevel_depth = 0.025
curve.bevel_resolution = 4

spline = curve.splines.new(type="POLY")
spline.points.add(samples - 1)

for i in range(samples):
    t = turns * 2 * math.pi * i / (samples - 1)
    x = radius * math.cos(t)
    y = radius * math.sin(t)
    z = pitch * t
    spline.points[i].co = (x, y, z, 1)

obj = bpy.data.objects.new(name, curve)
bpy.context.collection.objects.link(obj)

mat = bpy.data.materials.new(name + "_Material")
mat.diffuse_color = (0.1, 0.35, 0.9, 1.0)
obj.data.materials.append(mat)

# Add camera and light
bpy.ops.object.light_add(type="AREA", location=(0, -5, 6))
light = bpy.context.active_object
light.name = name + "_AreaLight"
light.data.energy = 450
light.data.size = 5

bpy.ops.object.camera_add(location=(5, -8, 5), rotation=(math.radians(60), 0, math.radians(34)))
bpy.context.scene.camera = bpy.context.active_object
`;

    setOutputs(commands, code, blenderCode);
}

function generateGeoGebraDoubleHelixBasePairs() {

    let instructions =
`DNA Double Helix with Base Pairs

This version extends the double helix by adding rungs that represent
base-pair positions.

Colour convention:
A = green
T = red
G = blue
C = orange

At this stage the base pairs are symbolic.
A later version can highlight one selected rung as an SNP site.`;

    let commands = `// DNA Double Helix with Base Pairs
// Paste these commands into the GeoGebra Input Bar.

H1 = Curve(2 cos(t), 2 sin(t), 0.35 t, t, 0, 10 pi)
H2 = Curve(2 cos(t + pi), 2 sin(t + pi), 0.35 t, t, 0, 10 pi)
`;

    let rungCount = 16;
    let radius = 2;
    let pitch = 0.35;

    let basePairs = [
        ["A", "T"],
        ["G", "C"],
        ["T", "A"],
        ["C", "G"]
    ];

    for (let i = 0; i < rungCount; i++) {

        let t = i * (10 * Math.PI) / (rungCount - 1);

        let x1 = radius * Math.cos(t);
        let y1 = radius * Math.sin(t);
        let z1 = pitch * t;

        let x2 = radius * Math.cos(t + Math.PI);
        let y2 = radius * Math.sin(t + Math.PI);
        let z2 = pitch * t;

        let pair = basePairs[i % basePairs.length];
        let leftBase = pair[0];
        let rightBase = pair[1];

        commands +=
`BP_L${i} = (${x1.toFixed(4)}, ${y1.toFixed(4)}, ${z1.toFixed(4)})
BP_R${i} = (${x2.toFixed(4)}, ${y2.toFixed(4)}, ${z2.toFixed(4)})
Rung${i} = Segment(BP_L${i}, BP_R${i})
BaseTextL${i} = Text("${leftBase}", (${(x1 + 0.18).toFixed(4)}, ${(y1 + 0.18).toFixed(4)}, ${z1.toFixed(4)}))
BaseTextR${i} = Text("${rightBase}", (${(x2 + 0.18).toFixed(4)}, ${(y2 + 0.18).toFixed(4)}, ${z2.toFixed(4)}))
`;
    }

    commands += `
DNALegend1 = Text("A = green", (4.8, 2.8))
DNALegend2 = Text("T = red", (4.8, 2.4))
DNALegend3 = Text("G = blue", (4.8, 2.0))
DNALegend4 = Text("C = orange", (4.8, 1.6))
`;

    let code =
`// GeoGebra Global JavaScript
// Optional styling for DNA double helix with base pairs

function styleDNABasePairs() {

    try {
        ggbApplet.setColor("H1", 80, 80, 180);
        ggbApplet.setColor("H2", 180, 80, 180);
        ggbApplet.setLineThickness("H1", 4);
        ggbApplet.setLineThickness("H2", 4);
        ggbApplet.setLabelVisible("H1", false);
        ggbApplet.setLabelVisible("H2", false);
    } catch(e) {}

    var rungCount = ${rungCount};
    var basePairs = [
        ["A", "T"],
        ["G", "C"],
        ["T", "A"],
        ["C", "G"]
    ];

    function colourBase(objName, base) {
        try {
            if (base === "A") {
                ggbApplet.setColor(objName, 40, 160, 60);
            } else if (base === "T") {
                ggbApplet.setColor(objName, 200, 50, 50);
            } else if (base === "G") {
                ggbApplet.setColor(objName, 50, 90, 220);
            } else if (base === "C") {
                ggbApplet.setColor(objName, 230, 140, 20);
            }
        } catch(e) {}
    }

    for (var i = 0; i < rungCount; i++) {

        var pair = basePairs[i % basePairs.length];
        var leftBase = pair[0];
        var rightBase = pair[1];

        try {
            ggbApplet.setLabelVisible("BP_L" + i, false);
            ggbApplet.setLabelVisible("BP_R" + i, false);
            ggbApplet.setPointSize("BP_L" + i, 4);
            ggbApplet.setPointSize("BP_R" + i, 4);

            colourBase("BP_L" + i, leftBase);
            colourBase("BP_R" + i, rightBase);

            ggbApplet.setColor("Rung" + i, 120, 120, 120);
            ggbApplet.setLineThickness("Rung" + i, 2);
            ggbApplet.setLabelVisible("Rung" + i, false);

            ggbApplet.setLabelVisible("BaseTextL" + i, false);
            ggbApplet.setLabelVisible("BaseTextR" + i, false);

            colourBase("BaseTextL" + i, leftBase);
            colourBase("BaseTextR" + i, rightBase);

        } catch(e) {}
    }

    try {
        ggbApplet.setLabelVisible("DNALegend1", false);
        ggbApplet.setLabelVisible("DNALegend2", false);
        ggbApplet.setLabelVisible("DNALegend3", false);
        ggbApplet.setLabelVisible("DNALegend4", false);

        ggbApplet.setColor("DNALegend1", 40, 160, 60);
        ggbApplet.setColor("DNALegend2", 200, 50, 50);
        ggbApplet.setColor("DNALegend3", 50, 90, 220);
        ggbApplet.setColor("DNALegend4", 230, 140, 20);
    } catch(e) {}
}
`;

    setOutputs(commands, code);
}

function generateDoubleHelixBasePairs() {
    generateGeoGebraDoubleHelixBasePairs();

    const dnaRadius = Number(document.getElementById("dnaRadius").value);
    const dnaPitch = Number(document.getElementById("dnaPitch").value);
    const dnaTurns = Number(document.getElementById("dnaTurns").value);
    const dnaRungCount = Number(document.getElementById("dnaRungCount").value);

    const commandBox = document.getElementById("ggbCommandOutput");
    const jsBox = document.getElementById("ggbJavascriptOutput");

    const existingCommands = commandBox ? commandBox.value : "";
    const existingJS = jsBox ? jsBox.value : "";

    const blenderCode = `import bpy
import math
from mathutils import Vector

# ------------------------------------------------------------
# Blender DNA Double Helix with Base Pairs
# Generated by the Visual Mathematics Framework
# ------------------------------------------------------------

bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)

RADIUS = ${dnaRadius}
PITCH = ${dnaPitch}
TURNS = ${dnaTurns}
RUNG_COUNT = ${dnaRungCount}

POINTS_PER_TURN = 72
TOTAL_POINTS = int(TURNS * POINTS_PER_TURN)
HEIGHT_PER_TURN = PITCH * 7.0
TOTAL_HEIGHT = TURNS * HEIGHT_PER_TURN

BACKBONE_BEVEL = 0.09
RUNG_RADIUS = 0.035
BASE_INSET = 0.36
BASE_BLOCK_SIZE = (0.42, 0.24, 0.24)

ANIMATION_FRAMES = 240

if RUNG_COUNT < 4:
    RUNG_COUNT = 4

def make_material(name, color, metallic=0.0, roughness=0.35):
    mat = bpy.data.materials.new(name=name)
    mat.use_nodes = True

    bsdf = mat.node_tree.nodes.get("Principled BSDF")

    if bsdf:
        bsdf.inputs["Base Color"].default_value = color
        bsdf.inputs["Metallic"].default_value = metallic
        bsdf.inputs["Roughness"].default_value = roughness

    return mat

mat_backbone_1 = make_material("Backbone blue", (0.12, 0.38, 0.95, 1.0), roughness=0.25)
mat_backbone_2 = make_material("Backbone violet", (0.72, 0.25, 0.95, 1.0), roughness=0.25)
mat_rung = make_material("Rung grey", (0.55, 0.60, 0.70, 1.0), roughness=0.45)

mat_A = make_material("A green", (0.05, 0.75, 0.18, 1.0))
mat_T = make_material("T red", (0.92, 0.12, 0.12, 1.0))
mat_G = make_material("G blue", (0.08, 0.35, 0.95, 1.0))
mat_C = make_material("C orange", (1.0, 0.50, 0.05, 1.0))

base_materials = {
    "A": mat_A,
    "T": mat_T,
    "G": mat_G,
    "C": mat_C
}

base_pairs = [
    ("A", "T"),
    ("G", "C"),
    ("T", "A"),
    ("C", "G")
]

all_objects = []

def helix_point(theta, phase=0.0):
    x = RADIUS * math.cos(theta + phase)
    y = RADIUS * math.sin(theta + phase)
    z = TOTAL_HEIGHT * (theta / (2 * math.pi * TURNS)) - TOTAL_HEIGHT / 2
    return Vector((x, y, z))

def create_curve_object(name, points, bevel_depth, material):
    curve = bpy.data.curves.new(name=name, type='CURVE')
    curve.dimensions = '3D'
    curve.resolution_u = 2
    curve.bevel_depth = bevel_depth
    curve.bevel_resolution = 5

    spline = curve.splines.new('POLY')
    spline.points.add(len(points) - 1)

    for p, co in zip(spline.points, points):
        p.co = (co.x, co.y, co.z, 1.0)

    obj = bpy.data.objects.new(name, curve)
    bpy.context.collection.objects.link(obj)
    obj.data.materials.append(material)

    all_objects.append(obj)
    return obj

def create_cylinder_between(name, p1, p2, radius, material):
    mid = (p1 + p2) / 2
    direction = p2 - p1
    length = direction.length

    bpy.ops.mesh.primitive_cylinder_add(
        vertices=24,
        radius=radius,
        depth=length,
        location=mid
    )

    obj = bpy.context.object
    obj.name = name

    obj.rotation_mode = 'QUATERNION'
    obj.rotation_quaternion = direction.to_track_quat('Z', 'Y')

    obj.data.materials.append(material)

    all_objects.append(obj)
    return obj

def create_base_block(name, location, direction, size, material):
    bpy.ops.mesh.primitive_cube_add(size=1, location=location)

    obj = bpy.context.object
    obj.name = name

    obj.dimensions = size
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)

    direction = Vector(direction).normalized()
    obj.rotation_mode = 'QUATERNION'
    obj.rotation_quaternion = direction.to_track_quat('X', 'Z')

    obj.data.materials.append(material)

    bevel = obj.modifiers.new(name="Soft rounded edges", type='BEVEL')
    bevel.width = 0.06
    bevel.segments = 5

    obj.modifiers.new(name="Weighted normals", type='WEIGHTED_NORMAL')

    all_objects.append(obj)
    return obj

strand_1_points = []
strand_2_points = []

for i in range(TOTAL_POINTS + 1):
    theta = 2 * math.pi * TURNS * i / TOTAL_POINTS
    strand_1_points.append(helix_point(theta, phase=0.0))
    strand_2_points.append(helix_point(theta, phase=math.pi))

create_curve_object("DNA_Backbone_1", strand_1_points, BACKBONE_BEVEL, mat_backbone_1)
create_curve_object("DNA_Backbone_2", strand_2_points, BACKBONE_BEVEL, mat_backbone_2)

for i in range(RUNG_COUNT):
    theta = 2 * math.pi * TURNS * i / (RUNG_COUNT - 1)

    left_backbone = helix_point(theta, phase=0.0)
    right_backbone = helix_point(theta, phase=math.pi)

    center = (left_backbone + right_backbone) / 2
    rung_direction = right_backbone - left_backbone

    left_base_pos = left_backbone.lerp(center, BASE_INSET)
    right_base_pos = right_backbone.lerp(center, BASE_INSET)

    pair = base_pairs[i % len(base_pairs)]

    create_cylinder_between(
        "Rung_" + str(i),
        left_backbone,
        right_backbone,
        RUNG_RADIUS,
        mat_rung
    )

    create_base_block(
        "BaseL_" + str(i) + "_" + pair[0],
        left_base_pos,
        rung_direction,
        BASE_BLOCK_SIZE,
        base_materials[pair[0]]
    )

    create_base_block(
        "BaseR_" + str(i) + "_" + pair[1],
        right_base_pos,
        rung_direction,
        BASE_BLOCK_SIZE,
        base_materials[pair[1]]
    )

dna_empty = bpy.data.objects.new("DNA_BasePairs_Rotation_Empty", None)
bpy.context.collection.objects.link(dna_empty)

for obj in all_objects:
    obj.parent = dna_empty

dna_empty.rotation_euler = (0, 0, 0)
dna_empty.keyframe_insert(data_path="rotation_euler", frame=1)

dna_empty.rotation_euler = (0, 0, 2 * math.pi)
dna_empty.keyframe_insert(data_path="rotation_euler", frame=ANIMATION_FRAMES)

try:
    action = dna_empty.animation_data.action

    if hasattr(action, "fcurves"):
        for curve in action.fcurves:
            for keyframe in curve.keyframe_points:
                keyframe.interpolation = 'LINEAR'
except Exception:
    pass

scene = bpy.context.scene
scene.frame_start = 1
scene.frame_end = ANIMATION_FRAMES
scene.frame_set(1)

bpy.ops.object.light_add(type='AREA', location=(0, -5, 6))
key = bpy.context.object
key.name = "Key light"
key.data.energy = 4500
key.data.size = 5

bpy.ops.object.light_add(type='AREA', location=(-5, 4, 4))
fill = bpy.context.object
fill.name = "Fill light"
fill.data.energy = 2200
fill.data.size = 6

bpy.ops.object.light_add(type='POINT', location=(3, 5, 5))
rim = bpy.context.object
rim.name = "Rim light"
rim.data.energy = 1200

bpy.ops.object.camera_add(location=(0, -8.5, 3.2), rotation=(math.radians(68), 0, 0))
camera = bpy.context.object
scene.camera = camera

world = scene.world or bpy.data.worlds.new("World")
scene.world = world
world.use_nodes = True

bg = world.node_tree.nodes.get("Background")

if bg:
    bg.inputs[0].default_value = (0.05, 0.05, 0.075, 1.0)
    bg.inputs[1].default_value = 1.1

scene.render.engine = 'CYCLES'

try:
    scene.cycles.samples = 96
except Exception:
    pass

scene.render.resolution_x = 1280
scene.render.resolution_y = 720
scene.render.fps = 24

scene.view_settings.view_transform = 'Filmic'
scene.view_settings.look = 'Medium High Contrast'
scene.view_settings.exposure = 0.6
scene.view_settings.gamma = 1.0

scene.frame_set(1)

print("VMF DNA Double Helix with Base Pairs created.")
`;
    setOutputs(existingCommands, existingJS, blenderCode, "");
}

function generateGeoGebraDoubleHelix() {

    const name = document.getElementById("doubleHelixName").value || "DH";
    const radius = Number(document.getElementById("doubleHelixRadius").value);
    const pitch = Number(document.getElementById("doubleHelixPitch").value);
    const turns = Number(document.getElementById("doubleHelixTurns").value);

    const t = "t";
    const endValue = `${turns} * 2 * pi`;

    let instructions =
`Double Helix

Stage 1 generator.

This version creates two helical strands wound around the same axis.

Mathematical idea:

- Strand 1 follows a helix.
- Strand 2 is phase-shifted by pi, so it lies opposite the first strand.
- Both rise together along the z-axis.

This gives a simple DNA-like double-helix form.

Current version:
1. Two helical strands only.
2. No connecting rungs yet.
3. Suitable for GeoGebra 3D and Blender.

Later extensions:
- connecting base-pair rungs,
- coloured nucleotide markers,
- SNP highlighting.`;

    let commands =
`${name}1 = Curve(${radius} cos(${t}), ${radius} sin(${t}), ${pitch} ${t}, ${t}, 0, ${endValue})
${name}2 = Curve(${radius} cos(${t} + pi), ${radius} sin(${t} + pi), ${pitch} ${t}, ${t}, 0, ${endValue})`;

    let code =
`// No GeoGebra Global JavaScript is required for this Double Helix.
// Use the GeoGebra Input Command panel above.`;

    let blenderCode =
`# Blender Python
# Double Helix

import bpy
import math

NAME = "${name}"
RADIUS = ${radius}
PITCH = ${pitch}
TURNS = ${turns}
SAMPLES = 300

def remove_if_exists(prefix):
    for obj in list(bpy.data.objects):
        if obj.name.startswith(prefix):
            bpy.data.objects.remove(obj, do_unlink=True)

remove_if_exists(NAME)

def make_helix_curve(obj_name, phase, rgba):
    curve = bpy.data.curves.new(obj_name, type="CURVE")
    curve.dimensions = "3D"
    curve.resolution_u = 2
    curve.bevel_depth = 0.03
    curve.bevel_resolution = 4

    spline = curve.splines.new(type="POLY")
    spline.points.add(SAMPLES - 1)

    for i in range(SAMPLES):
        t = TURNS * 2 * math.pi * i / (SAMPLES - 1)
        x = RADIUS * math.cos(t + phase)
        y = RADIUS * math.sin(t + phase)
        z = PITCH * t
        spline.points[i].co = (x, y, z, 1)

    obj = bpy.data.objects.new(obj_name, curve)
    bpy.context.collection.objects.link(obj)

    mat = bpy.data.materials.new(obj_name + "_Material")
    mat.diffuse_color = rgba
    obj.data.materials.append(mat)

    return obj

strand1 = make_helix_curve(NAME + "_1", 0.0, (0.15, 0.35, 0.95, 1.0))
strand2 = make_helix_curve(NAME + "_2", math.pi, (0.95, 0.2, 0.2, 1.0))

# Light
bpy.ops.object.light_add(type="AREA", location=(0, -8, 8))
light = bpy.context.active_object
light.data.energy = 500
light.data.size = 6

# Camera
bpy.ops.object.camera_add(
    location=(8, -12, 7),
    rotation=(math.radians(63), 0, math.radians(32))
)
bpy.context.scene.camera = bpy.context.active_object
`;

    setOutputs(commands, code, blenderCode);
}

function generateGeoGebraDNADoubleHelixSNP() {

const dnaRadius = Number(document.getElementById("dnaRadius").value);
const dnaPitch = Number(document.getElementById("dnaPitch").value);
const dnaTurns = Number(document.getElementById("dnaTurns").value);
const dnaRungCount = Number(document.getElementById("dnaRungCount").value);
const dnaSNPIndex = Number(document.getElementById("dnaSNPIndex").value);

    let instructions =
`DNA Double Helix with SNP

This generator creates a simplified DNA double helix in GeoGebra 3D.

Visual meaning:

- The blue and purple curves represent the two DNA strands.
- The grey rungs represent base-pair positions.
- One yellow rung marks a selected SNP site.
- The two coloured endpoint points on the yellow rung represent the variant base pair G-C.

The VMF input boxes control the radius, pitch, number of turns, number of rungs, and SNP rung index.

GeoGebra use:

1. Paste the Global JavaScript into GeoGebra Global JavaScript.
2. Create a button with:

buildDNAHelix();

3. Create another button with:

clearDNAHelix();`;

    let commands =
`// No GeoGebra Input Commands are required.
// This DNA/SNP version is built by Global JavaScript.`;

    let code =
`// --------------------------------------------------
// DNA Double Helix with SNP toggle
// --------------------------------------------------

var currentSNPMode = "reference";

function clearDNAHelix() {
    for (var i = ggbApplet.getObjectNumber() - 1; i >= 0; i--) {
        var obj = ggbApplet.getObjectName(i);

        if (
            obj === "H1" ||
            obj === "H2" ||
            obj === "SNPLabel" ||

            obj.indexOf("BP_L") === 0 ||
            obj.indexOf("BP_R") === 0 ||
            obj.indexOf("BP_") === 0 ||
            obj.indexOf("Rung") === 0 ||

            obj.indexOf("BaseTextL") === 0 ||
            obj.indexOf("BaseTextR") === 0 ||
            obj.indexOf("Base") === 0 ||

            obj.indexOf("DNALegend") === 0 ||
            obj.indexOf("SNP") === 0 ||

            obj.indexOf("DH") === 0 ||
            obj.indexOf("DHA") === 0 ||
            obj.indexOf("DHB") === 0 ||
            obj.indexOf("DHR") === 0
        ) {
            try {
                ggbApplet.deleteObject(obj);
            } catch (e) {}
        }
    }
}

function hideLabel(name) {
    try {
        ggbApplet.setLabelVisible(name, false);
    } catch (e) {}
}

function getBaseColor(base) {
    if (base === "A") {
        return [0, 160, 0];       // green
    }

    if (base === "T") {
        return [200, 0, 0];       // red
    }

    if (base === "G") {
        return [0, 80, 220];      // blue
    }

    if (base === "C") {
        return [255, 140, 0];     // orange
    }

    return [0, 0, 0];
}

function setBasePointColor(name, base) {
    var colour = getBaseColor(base);

    try {
        ggbApplet.setColor(name, colour[0], colour[1], colour[2]);
    } catch (e) {}
}

function updateSNPDisplay() {
    var snpIndex = 12;

    var leftPoint = "BP_L" + snpIndex;
    var rightPoint = "BP_R" + snpIndex;
    var rung = "Rung" + snpIndex;

    var pair;

    if (currentSNPMode === "reference") {
        pair = ["T", "A"];
    } else {
        pair = ["G", "C"];
    }

    try {
        ggbApplet.setVisible(leftPoint, true);
        ggbApplet.setVisible(rightPoint, true);

        ggbApplet.setPointSize(leftPoint, 8);
        ggbApplet.setPointSize(rightPoint, 8);

        setBasePointColor(leftPoint, pair[0]);
        setBasePointColor(rightPoint, pair[1]);

        ggbApplet.setColor(rung, 255, 210, 0);
        ggbApplet.setLineThickness(rung, 6);
    } catch (e) {}

    try {
        if (ggbApplet.exists("SNPLabel")) {
            ggbApplet.deleteObject("SNPLabel");
        }

        var labelText;

        if (currentSNPMode === "reference") {
            labelText = "SNP site: reference T-A";
        } else {
            labelText = "SNP site: variant G-C";
        }

        ggbApplet.evalCommand(
            'SNPLabel = Text("' + labelText + '", (3.2, 1.2, 4.8))'
        );

        hideLabel("SNPLabel");
        ggbApplet.setColor("SNPLabel", 220, 120, 0);
    } catch (e) {}
}

function showReferenceSNP() {
    currentSNPMode = "reference";
    updateSNPDisplay();
}

function showVariantSNP() {
    currentSNPMode = "variant";
    updateSNPDisplay();
}

function toggleSNP() {
    if (currentSNPMode === "reference") {
        currentSNPMode = "variant";
    } else {
        currentSNPMode = "reference";
    }

    updateSNPDisplay();
}

function buildDNAHelix() {
    clearDNAHelix();

    var radius = ${dnaRadius};
    var pitch = ${dnaPitch};
    var turns = ${dnaTurns};
    var rungCount = ${dnaRungCount};
    var snpIndex = ${dnaSNPIndex};

    var basePairs = [
        ["A", "T"],
        ["G", "C"],
        ["T", "A"],
        ["C", "G"]
    ];

    ggbApplet.evalCommand(
        "H1 = Curve(" + radius + " cos(t), " +
                         radius + " sin(t), " +
                         pitch + " t, t, 0, " +
                         turns + " * 2 * pi)"
    );

    ggbApplet.evalCommand(
        "H2 = Curve(" + radius + " cos(t + pi), " +
                         radius + " sin(t + pi), " +
                         pitch + " t, t, 0, " +
                         turns + " * 2 * pi)"
    );

    hideLabel("H1");
    hideLabel("H2");

    try {
        ggbApplet.setColor("H1", 40, 80, 220);
        ggbApplet.setColor("H2", 180, 60, 180);
        ggbApplet.setLineThickness("H1", 5);
        ggbApplet.setLineThickness("H2", 5);
    } catch (e) {}

    for (var i = 0; i < rungCount; i++) {
        var u = turns * 2 * Math.PI * i / rungCount;

        var x1 = radius * Math.cos(u);
        var y1 = radius * Math.sin(u);
        var z1 = pitch * u;

        var x2 = radius * Math.cos(u + Math.PI);
        var y2 = radius * Math.sin(u + Math.PI);
        var z2 = z1;

        var pair = basePairs[i % basePairs.length];

        var leftPoint = "BP_L" + i;
        var rightPoint = "BP_R" + i;
        var rung = "Rung" + i;

        ggbApplet.evalCommand(
            leftPoint + " = (" +
            x1.toFixed(4) + ", " +
            y1.toFixed(4) + ", " +
            z1.toFixed(4) + ")"
        );

        ggbApplet.evalCommand(
            rightPoint + " = (" +
            x2.toFixed(4) + ", " +
            y2.toFixed(4) + ", " +
            z2.toFixed(4) + ")"
        );

        ggbApplet.evalCommand(
            rung + " = Segment(" + leftPoint + ", " + rightPoint + ")"
        );

        hideLabel(leftPoint);
        hideLabel(rightPoint);
        hideLabel(rung);

        try {
            ggbApplet.setColor(rung, 120, 120, 120);
            ggbApplet.setLineThickness(rung, 2);

            if (i === snpIndex) {
                ggbApplet.setVisible(leftPoint, true);
                ggbApplet.setVisible(rightPoint, true);

                ggbApplet.setPointSize(leftPoint, 8);
                ggbApplet.setPointSize(rightPoint, 8);

                setBasePointColor(leftPoint, pair[0]);
                setBasePointColor(rightPoint, pair[1]);

                ggbApplet.setColor(rung, 255, 210, 0);
                ggbApplet.setLineThickness(rung, 6);
            } else {
                ggbApplet.setVisible(leftPoint, false);
                ggbApplet.setVisible(rightPoint, false);
            }
        } catch (e) {}
    }

    ggbApplet.evalCommand('DNALegend1 = Text("A = green", (-4.8, 2.8))');
    ggbApplet.evalCommand('DNALegend2 = Text("T = red", (-4.8, 2.4))');
    ggbApplet.evalCommand('DNALegend3 = Text("G = blue", (-4.8, 2.0))');
    ggbApplet.evalCommand('DNALegend4 = Text("C = orange", (-4.8, 1.6))');

    hideLabel("DNALegend1");
    hideLabel("DNALegend2");
    hideLabel("DNALegend3");
    hideLabel("DNALegend4");

    try {
        ggbApplet.setColor("DNALegend1", 0, 160, 0);
        ggbApplet.setColor("DNALegend2", 200, 0, 0);
        ggbApplet.setColor("DNALegend3", 0, 80, 220);
        ggbApplet.setColor("DNALegend4", 255, 140, 0);
    } catch (e) {}

    currentSNPMode = "reference";
    updateSNPDisplay();
}`;

    setOutputs(commands, code, "", "");
}

function generateDNADoubleHelixSNP() {
    generateGeoGebraDNADoubleHelixSNP();

    const dnaRadius = Number(document.getElementById("dnaRadius").value);
    const dnaPitch = Number(document.getElementById("dnaPitch").value);
    const dnaTurns = Number(document.getElementById("dnaTurns").value);
    const dnaRungCount = Number(document.getElementById("dnaRungCount").value);
    const dnaSNPIndex = Number(document.getElementById("dnaSNPIndex").value);

    const commandBox = document.getElementById("ggbCommandOutput");
    const jsBox = document.getElementById("ggbJavascriptOutput");

    const existingCommands = commandBox ? commandBox.value : "";
    const existingJS = jsBox ? jsBox.value : "";

    const blenderCode = `import bpy
import math
from mathutils import Vector

# ------------------------------------------------------------
# Blender DNA Double Helix with SNP
# Generated by the Visual Mathematics Framework
# ------------------------------------------------------------

# Clear scene
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)

# ------------------------------------------------------------
# VMF parameters
# ------------------------------------------------------------

RADIUS = ${dnaRadius}
PITCH = ${dnaPitch}
TURNS = ${dnaTurns}
RUNG_COUNT = ${dnaRungCount}
SNP_INDEX = ${dnaSNPIndex}

POINTS_PER_TURN = 72
TOTAL_POINTS = int(TURNS * POINTS_PER_TURN)
HEIGHT_PER_TURN = PITCH * 7.0
TOTAL_HEIGHT = TURNS * HEIGHT_PER_TURN

BACKBONE_BEVEL = 0.09
RUNG_RADIUS = 0.035

BASE_INSET = 0.36
ORDINARY_BLOCK_SIZE = (0.42, 0.24, 0.24)
SNP_BLOCK_SIZE = (0.75, 0.42, 0.36)

ANIMATION_FRAMES = 240
SWITCH_FRAME = 120

if RUNG_COUNT < 4:
    RUNG_COUNT = 4

if SNP_INDEX < 0:
    SNP_INDEX = 0

if SNP_INDEX >= RUNG_COUNT:
    SNP_INDEX = RUNG_COUNT - 1

# ------------------------------------------------------------
# Materials
# ------------------------------------------------------------

def make_material(name, color, metallic=0.0, roughness=0.35, alpha=1.0):
    mat = bpy.data.materials.new(name=name)
    mat.use_nodes = True

    bsdf = mat.node_tree.nodes.get("Principled BSDF")

    if bsdf:
        bsdf.inputs["Base Color"].default_value = color
        bsdf.inputs["Alpha"].default_value = alpha
        bsdf.inputs["Metallic"].default_value = metallic
        bsdf.inputs["Roughness"].default_value = roughness

    if alpha < 1.0:
        mat.blend_method = 'BLEND'
        mat.use_screen_refraction = True

    return mat


mat_backbone_1 = make_material("Backbone blue", (0.12, 0.38, 0.95, 1.0), roughness=0.25)
mat_backbone_2 = make_material("Backbone violet", (0.72, 0.25, 0.95, 1.0), roughness=0.25)
mat_rung = make_material("Ordinary rung grey", (0.55, 0.60, 0.70, 1.0), roughness=0.45)
mat_snp_support = make_material("SNP support gold", (1.0, 0.72, 0.08, 1.0), roughness=0.25)

mat_A = make_material("A green", (0.05, 0.75, 0.18, 1.0))
mat_T = make_material("T red", (0.92, 0.12, 0.12, 1.0))
mat_G = make_material("G blue", (0.08, 0.35, 0.95, 1.0))
mat_C = make_material("C orange", (1.0, 0.50, 0.05, 1.0))

mat_bond_normal = make_material("Normal dotted bond", (1.0, 0.82, 0.25, 1.0))
mat_bond_variant = make_material("Variant dotted bond", (0.35, 0.78, 1.0, 1.0))
mat_label_white = make_material("Label white", (1.0, 1.0, 1.0, 1.0), roughness=0.2)

# ------------------------------------------------------------
# Helpers
# ------------------------------------------------------------

all_dna_objects = []
normal_snp_objects = []
variant_snp_objects = []
label_objects = []


def helix_point(theta, phase=0.0):
    x = RADIUS * math.cos(theta + phase)
    y = RADIUS * math.sin(theta + phase)
    z = TOTAL_HEIGHT * (theta / (2 * math.pi * TURNS)) - TOTAL_HEIGHT / 2
    return Vector((x, y, z))


def create_curve_object(name, points, bevel_depth, material):
    curve = bpy.data.curves.new(name=name, type='CURVE')
    curve.dimensions = '3D'
    curve.resolution_u = 2
    curve.bevel_depth = bevel_depth
    curve.bevel_resolution = 5

    spline = curve.splines.new('POLY')
    spline.points.add(len(points) - 1)

    for p, co in zip(spline.points, points):
        p.co = (co.x, co.y, co.z, 1.0)

    obj = bpy.data.objects.new(name, curve)
    bpy.context.collection.objects.link(obj)
    obj.data.materials.append(material)

    all_dna_objects.append(obj)
    return obj


def create_cylinder_between(name, p1, p2, radius, material):
    mid = (p1 + p2) / 2
    direction = p2 - p1
    length = direction.length

    bpy.ops.mesh.primitive_cylinder_add(
        vertices=24,
        radius=radius,
        depth=length,
        location=mid
    )

    obj = bpy.context.object
    obj.name = name

    obj.rotation_mode = 'QUATERNION'
    obj.rotation_quaternion = direction.to_track_quat('Z', 'Y')

    obj.data.materials.append(material)

    all_dna_objects.append(obj)
    return obj


def create_base_block(name, location, direction, size, material):
    bpy.ops.mesh.primitive_cube_add(size=1, location=location)

    obj = bpy.context.object
    obj.name = name

    obj.dimensions = size
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)

    direction = Vector(direction).normalized()
    obj.rotation_mode = 'QUATERNION'
    obj.rotation_quaternion = direction.to_track_quat('X', 'Z')

    obj.data.materials.append(material)

    bevel = obj.modifiers.new(name="Soft rounded edges", type='BEVEL')
    bevel.width = 0.06
    bevel.segments = 5

    obj.modifiers.new(name="Weighted normals", type='WEIGHTED_NORMAL')

    all_dna_objects.append(obj)
    return obj


def create_dot(name, location, radius, material):
    bpy.ops.mesh.primitive_uv_sphere_add(
        segments=24,
        ring_count=12,
        radius=radius,
        location=location
    )

    obj = bpy.context.object
    obj.name = name
    obj.data.materials.append(material)

    all_dna_objects.append(obj)
    return obj


def make_dotted_bond(prefix, p1, p2, dot_radius, dot_count, material):
    dots = []

    for i in range(dot_count):
        t = (i + 1) / (dot_count + 1)
        pos = p1.lerp(p2, t)
        dot = create_dot(prefix + "_Dot_" + str(i), pos, dot_radius, material)
        dots.append(dot)

    return dots


def create_text_label(name, text, location, size, material):
    bpy.ops.object.text_add(location=location)

    obj = bpy.context.object
    obj.name = name
    obj.data.body = text
    obj.data.align_x = 'CENTER'
    obj.data.align_y = 'CENTER'
    obj.data.size = size
    obj.data.extrude = 0.015

    obj.data.materials.append(material)

    label_objects.append(obj)
    all_dna_objects.append(obj)

    return obj


def set_group_visible(objects, visible):
    for obj in objects:
        obj.hide_viewport = not visible
        obj.hide_render = not visible


def keyframe_group_visibility(objects, frame, visible):
    for obj in objects:
        obj.hide_viewport = not visible
        obj.hide_render = not visible
        obj.keyframe_insert(data_path="hide_viewport", frame=frame)
        obj.keyframe_insert(data_path="hide_render", frame=frame)


# ------------------------------------------------------------
# Build DNA backbones
# ------------------------------------------------------------

strand_1_points = []
strand_2_points = []

for i in range(TOTAL_POINTS + 1):
    theta = 2 * math.pi * TURNS * i / TOTAL_POINTS
    strand_1_points.append(helix_point(theta, phase=0.0))
    strand_2_points.append(helix_point(theta, phase=math.pi))

strand_1 = create_curve_object("DNA_Backbone_1", strand_1_points, BACKBONE_BEVEL, mat_backbone_1)
strand_2 = create_curve_object("DNA_Backbone_2", strand_2_points, BACKBONE_BEVEL, mat_backbone_2)

# ------------------------------------------------------------
# Rungs and nucleotide blocks
# ------------------------------------------------------------

base_pairs = [
    ("A", "T"),
    ("G", "C"),
    ("T", "A"),
    ("C", "G")
]

base_materials = {
    "A": mat_A,
    "T": mat_T,
    "G": mat_G,
    "C": mat_C
}

for i in range(RUNG_COUNT):
    theta = 2 * math.pi * TURNS * i / (RUNG_COUNT - 1)

    left_backbone = helix_point(theta, phase=0.0)
    right_backbone = helix_point(theta, phase=math.pi)

    center = (left_backbone + right_backbone) / 2
    rung_direction = right_backbone - left_backbone

    left_base_pos = left_backbone.lerp(center, BASE_INSET)
    right_base_pos = right_backbone.lerp(center, BASE_INSET)

    if i == SNP_INDEX:
        support = create_cylinder_between(
            "SNP_Support_Rung",
            left_backbone,
            right_backbone,
            RUNG_RADIUS * 1.8,
            mat_snp_support
        )

        # Reference SNP state: A-T
        normal_left = create_base_block(
            "SNP_Normal_A",
            left_base_pos,
            rung_direction,
            SNP_BLOCK_SIZE,
            mat_A
        )

        normal_right = create_base_block(
            "SNP_Normal_T",
            right_base_pos,
            rung_direction,
            SNP_BLOCK_SIZE,
            mat_T
        )

        normal_dots = make_dotted_bond(
            "SNP_Normal_AT",
            left_base_pos.lerp(center, 0.55),
            right_base_pos.lerp(center, 0.55),
            0.045,
            4,
            mat_bond_normal
        )

        normal_label_A = create_text_label(
            "SNP_Label_A",
            "A",
            left_base_pos + Vector((0, 0, 0.32)),
            0.26,
            mat_label_white
        )

        normal_label_T = create_text_label(
            "SNP_Label_T",
            "T",
            right_base_pos + Vector((0, 0, 0.32)),
            0.26,
            mat_label_white
        )

        normal_snp_objects.extend(
            [normal_left, normal_right, normal_label_A, normal_label_T] + normal_dots
        )

        # Variant SNP state: G-C
        variant_left = create_base_block(
            "SNP_Variant_G",
            left_base_pos,
            rung_direction,
            SNP_BLOCK_SIZE,
            mat_G
        )

        variant_right = create_base_block(
            "SNP_Variant_C",
            right_base_pos,
            rung_direction,
            SNP_BLOCK_SIZE,
            mat_C
        )

        variant_dots = make_dotted_bond(
            "SNP_Variant_GC",
            left_base_pos.lerp(center, 0.55),
            right_base_pos.lerp(center, 0.55),
            0.045,
            4,
            mat_bond_variant
        )

        variant_label_G = create_text_label(
            "SNP_Label_G",
            "G",
            left_base_pos + Vector((0, 0, 0.32)),
            0.26,
            mat_label_white
        )

        variant_label_C = create_text_label(
            "SNP_Label_C",
            "C",
            right_base_pos + Vector((0, 0, 0.32)),
            0.26,
            mat_label_white
        )

        variant_snp_objects.extend(
            [variant_left, variant_right, variant_label_G, variant_label_C] + variant_dots
        )

    else:
        pair = base_pairs[i % len(base_pairs)]

        create_cylinder_between(
            "Rung_" + str(i),
            left_backbone,
            right_backbone,
            RUNG_RADIUS,
            mat_rung
        )

        create_base_block(
            "BaseL_" + str(i) + "_" + pair[0],
            left_base_pos,
            rung_direction,
            ORDINARY_BLOCK_SIZE,
            base_materials[pair[0]]
        )

        create_base_block(
            "BaseR_" + str(i) + "_" + pair[1],
            right_base_pos,
            rung_direction,
            ORDINARY_BLOCK_SIZE,
            base_materials[pair[1]]
        )

# ------------------------------------------------------------
# SNP visibility animation: A-T switches to G-C
# ------------------------------------------------------------

set_group_visible(normal_snp_objects, True)
set_group_visible(variant_snp_objects, False)

keyframe_group_visibility(normal_snp_objects, 1, True)
keyframe_group_visibility(variant_snp_objects, 1, False)

keyframe_group_visibility(normal_snp_objects, SWITCH_FRAME - 1, True)
keyframe_group_visibility(variant_snp_objects, SWITCH_FRAME - 1, False)

keyframe_group_visibility(normal_snp_objects, SWITCH_FRAME, False)
keyframe_group_visibility(variant_snp_objects, SWITCH_FRAME, True)

keyframe_group_visibility(normal_snp_objects, ANIMATION_FRAMES, False)
keyframe_group_visibility(variant_snp_objects, ANIMATION_FRAMES, True)

# ------------------------------------------------------------
# Parent all DNA objects to an empty for rotation
# ------------------------------------------------------------

dna_empty = bpy.data.objects.new("DNA_SNP_Rotation_Empty", None)
bpy.context.collection.objects.link(dna_empty)

for obj in all_dna_objects:
    obj.parent = dna_empty

dna_empty.rotation_euler = (0, 0, 0)
dna_empty.keyframe_insert(data_path="rotation_euler", frame=1)

dna_empty.rotation_euler = (0, 0, 2 * math.pi)
dna_empty.keyframe_insert(data_path="rotation_euler", frame=ANIMATION_FRAMES)

try:
    action = dna_empty.animation_data.action

    if hasattr(action, "fcurves"):
        for curve in action.fcurves:
            for keyframe in curve.keyframe_points:
                keyframe.interpolation = 'LINEAR'

except Exception:
    pass

# ------------------------------------------------------------
# Camera and lighting
# ------------------------------------------------------------

scene = bpy.context.scene
scene.frame_start = 1
scene.frame_end = ANIMATION_FRAMES
scene.frame_set(1)

bpy.ops.object.light_add(type='AREA', location=(0, -5, 6))
key = bpy.context.object
key.name = "Key light"
key.data.energy = 4500
key.data.size = 5

bpy.ops.object.light_add(type='AREA', location=(-5, 4, 4))
fill = bpy.context.object
fill.name = "Fill light"
fill.data.energy = 2200
fill.data.size = 6

bpy.ops.object.light_add(type='POINT', location=(3, 5, 5))
rim = bpy.context.object
rim.name = "Rim light"
rim.data.energy = 1200

bpy.ops.object.camera_add(location=(0, -8.5, 3.2), rotation=(math.radians(68), 0, 0))
camera = bpy.context.object
scene.camera = camera

# Make text labels face the camera
for label in label_objects:
    constraint = label.constraints.new(type='TRACK_TO')
    constraint.track_axis = 'TRACK_Z'
    constraint.up_axis = 'UP_Y'
    constraint.target = camera

# ------------------------------------------------------------
# World and render settings
# ------------------------------------------------------------

world = scene.world or bpy.data.worlds.new("World")
scene.world = world
world.use_nodes = True

bg = world.node_tree.nodes.get("Background")

if bg:
    bg.inputs[0].default_value = (0.05, 0.05, 0.075, 1.0)
    bg.inputs[1].default_value = 1.1

scene.render.engine = 'CYCLES'

try:
    scene.cycles.samples = 96
except Exception:
    pass

scene.render.resolution_x = 1280
scene.render.resolution_y = 720
scene.render.fps = 24

scene.view_settings.view_transform = 'Filmic'
scene.view_settings.look = 'Medium High Contrast'
scene.view_settings.exposure = 0.6
scene.view_settings.gamma = 1.0

# Set origin view frame
scene.frame_set(1)

print("VMF DNA Double Helix with SNP created.")
print("Reference state A-T appears first.")
print("Variant state G-C appears from frame " + str(SWITCH_FRAME) + ".")
`;

    setOutputs(existingCommands, existingJS, blenderCode);
}

function generateGeoGebraCellBranchingStats() {
    let p0 = document.getElementById("cellStatsP0").value;
    let p2 = document.getElementById("cellStatsP2").value;
    let g = document.getElementById("cellStatsG").value;
    let trials = document.getElementById("cellStatsTrials").value;

    let p1 = 1 - parseFloat(p0) - parseFloat(p2);

    if (p1 < 0) {
        setOutputs(
            "Error: p0 + p2 must be less than or equal to 1.\n\n" +
            "Current values give p1 = " + p1.toFixed(3)
        );
        return;
    }

    let instructions =
`// Biological Cell Branching Statistics.
//
// This statistics version is designed to work with the live
// Biological Cell Branching controls if they already exist:
//
// cellP0
// cellP2
// cellGenerations
//
// If those controls do not exist, this script creates them using
// the values from the HTML Statistics panel.
//
// Create GeoGebra buttons with:
//
// runCellBranchingStats();
//
// showCellBranchingTree();
//
// showCellBranchingStats();
//
// Suggested workflow:
//
// 1. Build a biological cell branching tree.
// 2. Run runCellBranchingStats();
// 3. Use showCellBranchingTree(); to view the tree.
// 4. Use showCellBranchingStats(); to view the statistics.
//
// The statistics display uses variables beginning with CBStat.
// The tree display uses objects beginning with CB_B_ and CB_D_.`;

    let code =
`// GeoGebra Global JavaScript
// Biological Cell Branching Statistics
// Live-control compatible version.
//
// Cell fates:
// p0 = death, 0 offspring
// p1 = quiescence, 1 offspring
// p2 = proliferation, 2 offspring
//
// Button commands:
//
// runCellBranchingStats();
// showCellBranchingTree();
// showCellBranchingStats();

function fmtCellStat(x) {
    return Number(x.toFixed(6));
}

function hideObjectsWithPrefix(prefix) {

    for (var i = 0; i < ggbApplet.getObjectNumber(); i++) {
        try {
            var obj = ggbApplet.getObjectName(i);

            if (obj.indexOf(prefix) === 0) {
                ggbApplet.setVisible(obj, false);
            }
        } catch(e) {}
    }
}

function showObjectsWithPrefix(prefix) {

    for (var i = 0; i < ggbApplet.getObjectNumber(); i++) {
        try {
            var obj = ggbApplet.getObjectName(i);

            if (obj.indexOf(prefix) === 0) {
                ggbApplet.setVisible(obj, true);
            }
        } catch(e) {}
    }
}

function showCellBranchingTree() {

    showObjectsWithPrefix("CB_B_");
    showObjectsWithPrefix("CB_D_");

    hideObjectsWithPrefix("CBStat");
}

function showCellBranchingStats() {

    hideObjectsWithPrefix("CB_B_");
    hideObjectsWithPrefix("CB_D_");

    showObjectsWithPrefix("CBStat");
}

function setCBStatNumber(name, value) {

    if (!ggbApplet.exists(name)) {
        ggbApplet.evalCommand(name + " = " + value);
    } else {
        ggbApplet.evalCommand("SetValue(" + name + ", " + value + ")");
    }

    try {
        ggbApplet.setLabelVisible(name, false);
    } catch(e) {}
}

function setCBStatText(name, value) {

    if (!ggbApplet.exists(name)) {
        ggbApplet.evalCommand(name + " = \\"" + value + "\\"");
    } else {
        ggbApplet.evalCommand("SetValue(" + name + ", \\"" + value + "\\")");
    }

    try {
        ggbApplet.setLabelVisible(name, false);
    } catch(e) {}
}

function ensureCellStatControls() {

    if (!ggbApplet.exists("cellP0")) {
        ggbApplet.evalCommand("cellP0 = ${p0}");
        ggbApplet.setLabelVisible("cellP0", true);
    }

    if (!ggbApplet.exists("cellP2")) {
        ggbApplet.evalCommand("cellP2 = ${p2}");
        ggbApplet.setLabelVisible("cellP2", true);
    }

    if (!ggbApplet.exists("cellGenerations")) {
        ggbApplet.evalCommand("cellGenerations = ${g}");
        ggbApplet.setLabelVisible("cellGenerations", true);
    }
}

function runCellBranchingStats() {

    ensureCellStatControls();

    var p0 = ggbApplet.getValue("cellP0");
    var p2 = ggbApplet.getValue("cellP2");
    var p1 = 1 - p0 - p2;

    var generations = Math.round(ggbApplet.getValue("cellGenerations"));
    var trials = ${trials};

    if (p1 < 0) {
        alert(
            "Invalid probabilities.\\\\n\\\\n" +
            "cellP0 + cellP2 must be less than or equal to 1.\\\\n\\\\n" +
            "Current values give cellP1 = " + p1.toFixed(3)
        );
        return;
    }

    if (generations < 1) {
        generations = 1;
    }

    if (generations > 20) {
        alert("cellGenerations is large. Using 20 instead.");
        generations = 20;
    }

    if (trials < 1) {
        trials = 1;
    }

    var extinctCount = 0;
    var survivalCount = 0;

    var sumFinalPopulation = 0;
    var sumMaxPopulation = 0;
    var maxObservedPopulation = 0;

    var totalQuiescentRunLength = 0;
    var quiescentRunCount = 0;
    var maxQuiescentRun = 0;

    var quiescentExitsToDeath = 0;
    var quiescentExitsToProliferation = 0;

    function simulateOneTrial() {

        var cells = [
            { quiescentRun: 0 }
        ];

        var maxPopulation = cells.length;

        for (var gen = 1; gen <= generations; gen++) {

            var nextCells = [];

            for (var i = 0; i < cells.length; i++) {

                var currentRun = cells[i].quiescentRun;
                var u = Math.random();

                if (u < p0) {

                    if (currentRun > 0) {
                        totalQuiescentRunLength += currentRun;
                        quiescentRunCount++;

                        if (currentRun > maxQuiescentRun) {
                            maxQuiescentRun = currentRun;
                        }

                        quiescentExitsToDeath++;
                    }

                } else if (u < p0 + p1) {

                    nextCells.push({
                        quiescentRun: currentRun + 1
                    });

                } else {

                    if (currentRun > 0) {
                        totalQuiescentRunLength += currentRun;
                        quiescentRunCount++;

                        if (currentRun > maxQuiescentRun) {
                            maxQuiescentRun = currentRun;
                        }

                        quiescentExitsToProliferation++;
                    }

                    nextCells.push({ quiescentRun: 0 });
                    nextCells.push({ quiescentRun: 0 });
                }
            }

            cells = nextCells;

            if (cells.length > maxPopulation) {
                maxPopulation = cells.length;
            }

            if (cells.length === 0) {
                break;
            }
        }

        return {
            finalPopulation: cells.length,
            maxPopulation: maxPopulation,
            extinct: cells.length === 0
        };
    }

    for (var trial = 0; trial < trials; trial++) {

        var result = simulateOneTrial();

        if (result.extinct) {
            extinctCount++;
        } else {
            survivalCount++;
        }

        sumFinalPopulation += result.finalPopulation;
        sumMaxPopulation += result.maxPopulation;

        if (result.maxPopulation > maxObservedPopulation) {
            maxObservedPopulation = result.maxPopulation;
        }
    }

    var extinctionRate = extinctCount / trials;
    var survivalRate = survivalCount / trials;
    var meanFinalPopulation = sumFinalPopulation / trials;
    var meanMaxPopulation = sumMaxPopulation / trials;
    var meanOffspring = p1 + 2 * p2;

    var meanQuiescentRun = 0;

    if (quiescentRunCount > 0) {
        meanQuiescentRun =
            totalQuiescentRunLength / quiescentRunCount;
    }

    var quiescentExitTotal =
        quiescentExitsToDeath + quiescentExitsToProliferation;

    var quiescentExitDeathRate = 0;
    var quiescentExitProliferationRate = 0;

    if (quiescentExitTotal > 0) {
        quiescentExitDeathRate =
            quiescentExitsToDeath / quiescentExitTotal;

        quiescentExitProliferationRate =
            quiescentExitsToProliferation / quiescentExitTotal;
    }

    setCBStatNumber("CBStatTrials", trials);
    setCBStatNumber("CBStatGenerations", generations);

    setCBStatNumber("CBStatDeathProbability", fmtCellStat(p0));
    setCBStatNumber("CBStatQuiescenceProbability", fmtCellStat(p1));
    setCBStatNumber("CBStatProliferationProbability", fmtCellStat(p2));
    setCBStatNumber("CBStatMeanOffspring", fmtCellStat(meanOffspring));

    setCBStatNumber("CBStatExtinctions", extinctCount);
    setCBStatNumber("CBStatSurvivals", survivalCount);
    setCBStatNumber("CBStatExtinctionRate", fmtCellStat(extinctionRate));
    setCBStatNumber("CBStatSurvivalRate", fmtCellStat(survivalRate));

    setCBStatNumber("CBStatMeanFinalPopulation", fmtCellStat(meanFinalPopulation));
    setCBStatNumber("CBStatMeanMaxPopulation", fmtCellStat(meanMaxPopulation));
    setCBStatNumber("CBStatMaxObservedPopulation", maxObservedPopulation);

    setCBStatNumber("CBStatMeanQuiescentRun", fmtCellStat(meanQuiescentRun));
    setCBStatNumber("CBStatMaxQuiescentRun", maxQuiescentRun);
    setCBStatNumber("CBStatQuiescentRunCount", quiescentRunCount);

    setCBStatNumber("CBStatQuiescentExitsToDeath", quiescentExitsToDeath);
    setCBStatNumber("CBStatQuiescentExitsToProliferation", quiescentExitsToProliferation);

    setCBStatNumber("CBStatQuiescentExitDeathRate", fmtCellStat(quiescentExitDeathRate));
    setCBStatNumber("CBStatQuiescentExitProliferationRate", fmtCellStat(quiescentExitProliferationRate));

    setCBStatText("CBStatDisplayMode", "statistics");

    showCellBranchingStats();
}`;

    setOutputs(instructions, code);
}

function generateGeoGebraCellBranchingCombined() {

   let instructions =
`Biological Cell Branching: Tree + Statistics

This combined object builds a biological cell-branching tree and also runs repeated-trial statistics.

Paste the JavaScript code from the GeoGebra Global JavaScript panel
into GeoGebra's Global JavaScript section.

Use the GeoGebra Button Setup panel for the required button calls.

Suggested control values:

cellP0: 0 to 1, increment 0.01
cellP2: 0 to 1, increment 0.01
cellGenerations: 1 to 12, increment 1
cellLengthFactor: 0.4 to 0.9, increment 0.05
cellAngle: 5 to 60, increment 1
cellJitter: 0 to 30, increment 1
cellMaxBranches: 50 to 2000, increment 50

Important:

cellP0 + cellP2 must be less than or equal to 1.

The remaining probability is:

cellP1 = 1 - cellP0 - cellP2

where:

cellP0 = death probability
cellP1 = quiescence / one-child probability
cellP2 = proliferation / two-child probability

Display-box note:

The arrays CellTreeDisplayObjects and CellStatsDisplayObjects must contain the actual GeoGebra object names of your green input boxes and labels.`;

    let buttonInstructions =
`Create these GeoGebra buttons.

Button label:
Setup controls

On Click JavaScript:
setupCellBranchingControls();

Button label:
Build / rebuild visible tree

On Click JavaScript:
buildCellBranching();
showCellBranchingTree();

Button label:
Run repeated-trial statistics

On Click JavaScript:
runCellBranchingStats();

Button label:
Show statistics display

On Click JavaScript:
showCellBranchingStats();

Button label:
Return to tree display

On Click JavaScript:
showCellBranchingTree();
`;

    let code =
`// GeoGebra Global JavaScript
// Biological Cell Branching: Tree + Statistics
//
// Combined version.
//
// Button commands:
//
// setupCellBranchingControls();
//
// buildCellBranching();
// showCellBranchingTree();
//
// runCellBranchingStats();
//
// showCellBranchingStats();
//
// showCellBranchingTree();

function ggbOnInit() {}

var CellB = {
    objects: [],
    branchCount: 0,
    deathCount: 0,
    reachedFinalGeneration: 0,

    p0: 0.25,
    p1: 1 - 0.25 - 0.45,
    p2: 0.45,

    generations: 9,
    lengthFactor: 0.75,
    angle: 25,
    jitter: 8,
    maxBranches: 1000
};

var CellTreeDisplayObjects = [
    "TreeDeathProbabilityBox",
    "TreeQuiescenceProbabilityBox",
    "TreeProliferationProbabilityBox",
    "TreeMeanOffspringBox",
    "TreeReachedFinalBox",

    "TreeDeathProbabilityLabel",
    "TreeQuiescenceProbabilityLabel",
    "TreeProliferationProbabilityLabel",
    "TreeMeanOffspringLabel",
    "TreeReachedFinalLabel"
];

var CellTreeRawVariables = [
    "CellDeathProbability",
    "CellQuiescenceProbability",
    "CellProliferationProbability",
    "CellMeanOffspring",
    "CellReachedFinalText",
    "CellTotalBranches",
    "CellDeaths",
    "CellFinalGenerationReached",
    "CellSurvived",
    "CellExtinctEarly",
    "CellCurrentP0",
    "CellCurrentP1",
    "CellCurrentP2",
    "CellCurrentGenerations",
    "CellCurrentLengthFactor",
    "CellCurrentAngle",
    "CellCurrentJitter",
    "CellCurrentMaxBranches"
];

var CellStatsDisplayObjects = [
    "StatsTrialsBox",
    "StatsMeanOffspringBox",
    "StatsExtinctionRateBox",
    "StatsSurvivalRateBox",
    "StatsMeanFinalPopulationBox",
    "StatsMeanMaxPopulationBox",

    "StatsTrialsLabel",
    "StatsMeanOffspringLabel",
    "StatsExtinctionRateLabel",
    "StatsSurvivalRateLabel",
    "StatsMeanFinalPopulationLabel",
    "StatsMeanMaxPopulationLabel"
];

var CellStatsRawVariables = [
    "CBStatTrials",
    "CBStatGenerations",
    "CBStatDeathProbability",
    "CBStatQuiescenceProbability",
    "CBStatProliferationProbability",
    "CBStatMeanOffspring",
    "CBStatExtinctions",
    "CBStatSurvivals",
    "CBStatExtinctionRate",
    "CBStatSurvivalRate",
    "CBStatMeanFinalPopulation",
    "CBStatMeanMaxPopulation",
    "CBStatMaxObservedPopulation",
    "CBStatMeanQuiescentRun",
    "CBStatMaxQuiescentRun",
    "CBStatQuiescentRunCount",
    "CBStatQuiescentExitsToDeath",
    "CBStatQuiescentExitsToProliferation",
    "CBStatQuiescentExitDeathRate",
    "CBStatQuiescentExitProliferationRate",
    "CBStatDisplayMode"
];

function setupCellBranchingControls() {

    if (!ggbApplet.exists("cellP0")) {
        ggbApplet.evalCommand("cellP0 = 0.25");
        ggbApplet.setLabelVisible("cellP0", true);
    }

    if (!ggbApplet.exists("cellP2")) {
        ggbApplet.evalCommand("cellP2 = 0.45");
        ggbApplet.setLabelVisible("cellP2", true);
    }

    if (!ggbApplet.exists("cellGenerations")) {
        ggbApplet.evalCommand("cellGenerations = 9");
        ggbApplet.setLabelVisible("cellGenerations", true);
    }

    if (!ggbApplet.exists("cellLengthFactor")) {
        ggbApplet.evalCommand("cellLengthFactor = 0.75");
        ggbApplet.setLabelVisible("cellLengthFactor", true);
    }

    if (!ggbApplet.exists("cellAngle")) {
        ggbApplet.evalCommand("cellAngle = 25");
        ggbApplet.setLabelVisible("cellAngle", true);
    }

    if (!ggbApplet.exists("cellJitter")) {
        ggbApplet.evalCommand("cellJitter = 8");
        ggbApplet.setLabelVisible("cellJitter", true);
    }

    if (!ggbApplet.exists("cellMaxBranches")) {
        ggbApplet.evalCommand("cellMaxBranches = 1000");
        ggbApplet.setLabelVisible("cellMaxBranches", true);
    }

    alert(
        "Biological Cell Branching controls created.\\n\\n" +
        "If GeoGebra does not show them as sliders, make these objects visible manually.\\n\\n" +
        "Suggested settings:\\n\\n" +
        "cellP0: 0 to 1, increment 0.01\\n" +
        "cellP2: 0 to 1, increment 0.01\\n" +
        "cellGenerations: 1 to 12, increment 1\\n" +
        "cellLengthFactor: 0.4 to 0.9, increment 0.05\\n" +
        "cellAngle: 5 to 60, increment 1\\n" +
        "cellJitter: 0 to 30, increment 1\\n" +
        "cellMaxBranches: 50 to 2000, increment 50\\n\\n" +
        "Important: cellP0 + cellP2 must be less than or equal to 1."
    );
}

function readCellBranchingControls() {

    if (!ggbApplet.exists("cellP0")) {
        ggbApplet.evalCommand("cellP0 = 0.25");
    }

    if (!ggbApplet.exists("cellP2")) {
        ggbApplet.evalCommand("cellP2 = 0.45");
    }

    if (!ggbApplet.exists("cellGenerations")) {
        ggbApplet.evalCommand("cellGenerations = 9");
    }

    if (!ggbApplet.exists("cellLengthFactor")) {
        ggbApplet.evalCommand("cellLengthFactor = 0.75");
    }

    if (!ggbApplet.exists("cellAngle")) {
        ggbApplet.evalCommand("cellAngle = 25");
    }

    if (!ggbApplet.exists("cellJitter")) {
        ggbApplet.evalCommand("cellJitter = 8");
    }

    if (!ggbApplet.exists("cellMaxBranches")) {
        ggbApplet.evalCommand("cellMaxBranches = 1000");
    }

    CellB.p0 = ggbApplet.getValue("cellP0");
    CellB.p2 = ggbApplet.getValue("cellP2");

    if (CellB.p0 < 0) {
        CellB.p0 = 0;
    }

    if (CellB.p2 < 0) {
        CellB.p2 = 0;
    }

    if (CellB.p0 > 1) {
        CellB.p0 = 1;
    }

    if (CellB.p2 > 1) {
        CellB.p2 = 1;
    }

    CellB.p1 = 1 - CellB.p0 - CellB.p2;

    if (CellB.p1 < 0) {
        alert(
            "Invalid probabilities.\\n\\n" +
            "cellP0 + cellP2 must be less than or equal to 1.\\n\\n" +
            "Current values give cellP1 = " + CellB.p1.toFixed(3)
        );
        return false;
    }

    CellB.generations = Math.round(ggbApplet.getValue("cellGenerations"));
    CellB.lengthFactor = ggbApplet.getValue("cellLengthFactor");
    CellB.angle = ggbApplet.getValue("cellAngle");
    CellB.jitter = ggbApplet.getValue("cellJitter");
    CellB.maxBranches = Math.round(ggbApplet.getValue("cellMaxBranches"));

    if (CellB.generations < 1) {
        CellB.generations = 1;
    }

    if (CellB.generations > 15) {
        alert("cellGenerations is large. Using 15 instead.");
        CellB.generations = 15;
    }

    if (CellB.lengthFactor <= 0) {
        CellB.lengthFactor = 0.75;
    }

    if (CellB.maxBranches < 1) {
        CellB.maxBranches = 1;
    }

    return true;
}

function clearCellBranching() {

    for (var i = ggbApplet.getObjectNumber() - 1; i >= 0; i--) {
        var obj = ggbApplet.getObjectName(i);

        if (obj.indexOf("CB_B_") === 0 ||
            obj.indexOf("CB_D_") === 0) {
            try {
                ggbApplet.deleteObject(obj);
            } catch(e) {}
        }
    }

    CellB.objects = [];
    CellB.branchCount = 0;
    CellB.deathCount = 0;
    CellB.reachedFinalGeneration = 0;
}

function randomBetween(a, b) {
    return a + Math.random() * (b - a);
}

function degreesToRadians(deg) {
    return deg * Math.PI / 180;
}

function drawCellBranch(x1, y1, x2, y2, generation, fate) {

    if (CellB.branchCount >= CellB.maxBranches) {
        return;
    }

    var name = "CB_B_" + CellB.branchCount;

    var cmd = name + " = Segment((" +
        x1 + "," + y1 + "),(" +
        x2 + "," + y2 + "))";

    var beforeNames = {};

    for (var b = 0; b < ggbApplet.getObjectNumber(); b++) {
        beforeNames[ggbApplet.getObjectName(b)] = true;
    }

    ggbApplet.evalCommand(cmd);

    var red;
    var green;
    var blue;

    if (fate === "quiescence") {
        red = 40;
        green = 150;
        blue = 220;
    } else if (fate === "proliferation") {
        red = Math.min(255, 80 + generation * 20);
        green = Math.max(60, 170 - generation * 10);
        blue = Math.max(60, 180 - generation * 12);
    } else {
        red = 120;
        green = 120;
        blue = 120;
    }

    for (var k = 0; k < ggbApplet.getObjectNumber(); k++) {
        try {
            var obj = ggbApplet.getObjectName(k);

            if (!beforeNames[obj]) {
                ggbApplet.setLabelVisible(obj, false);
                ggbApplet.setColor(obj, red, green, blue);
                ggbApplet.setLineThickness(obj, Math.max(2, 6 - generation * 0.25));
            }
        } catch(e) {}
    }

    try {
        ggbApplet.setLabelVisible(name, false);
        ggbApplet.setColor(name, red, green, blue);
        ggbApplet.setLineThickness(name, Math.max(2, 6 - generation * 0.25));
    } catch(e) {}

    CellB.objects.push(name);
    CellB.branchCount++;
}

function markCellDeath(x, y) {

    var name = "CB_D_" + CellB.deathCount;

    ggbApplet.evalCommand(
        name + " = (" + x + "," + y + ")"
    );

    try {
        ggbApplet.setColor(name, 120, 120, 120);
        ggbApplet.setPointSize(name, 4);
        ggbApplet.setLabelVisible(name, false);
    } catch(e) {}

    CellB.deathCount++;
}

function chooseCellFate() {

    var u = Math.random();

    if (u < CellB.p0) {
        return "death";
    }

    if (u < CellB.p0 + CellB.p1) {
        return "quiescence";
    }

    return "proliferation";
}

function growCellBranching(x, y, length, angle, generation) {

    if (generation > CellB.generations) {
        return;
    }

    if (CellB.branchCount >= CellB.maxBranches) {
        return;
    }

    if (generation === CellB.generations) {
        CellB.reachedFinalGeneration = 1;
    }

    var fate = chooseCellFate();

    if (fate === "death") {
        markCellDeath(x, y);
        return;
    }

    if (fate === "quiescence") {

        var randomError =
            degreesToRadians(randomBetween(-CellB.jitter, CellB.jitter));

        var childAngle = angle + randomError;

        var x2 = x + length * Math.cos(childAngle);
        var y2 = y + length * Math.sin(childAngle);

        drawCellBranch(x, y, x2, y2, generation, "quiescence");

        growCellBranching(
            x2,
            y2,
            length * CellB.lengthFactor,
            childAngle,
            generation + 1
        );

        return;
    }

    if (fate === "proliferation") {

        var leftAngle =
            angle + degreesToRadians(CellB.angle) +
            degreesToRadians(randomBetween(-CellB.jitter, CellB.jitter));

        var rightAngle =
            angle - degreesToRadians(CellB.angle) +
            degreesToRadians(randomBetween(-CellB.jitter, CellB.jitter));

        var xL = x + length * Math.cos(leftAngle);
        var yL = y + length * Math.sin(leftAngle);

        var xR = x + length * Math.cos(rightAngle);
        var yR = y + length * Math.sin(rightAngle);

        drawCellBranch(x, y, xL, yL, generation, "proliferation");
        drawCellBranch(x, y, xR, yR, generation, "proliferation");

        growCellBranching(
            xL,
            yL,
            length * CellB.lengthFactor,
            leftAngle,
            generation + 1
        );

        growCellBranching(
            xR,
            yR,
            length * CellB.lengthFactor,
            rightAngle,
            generation + 1
        );
    }
}

function setCellNumber(name, value) {

    if (!ggbApplet.exists(name)) {
        ggbApplet.evalCommand(name + " = " + value);
    } else {
        ggbApplet.evalCommand("SetValue(" + name + ", " + value + ")");
    }

    try {
        ggbApplet.setLabelVisible(name, false);
        ggbApplet.setVisible(name, false);
    } catch(e) {}
}

function setCellText(name, value) {

    if (!ggbApplet.exists(name)) {
        ggbApplet.evalCommand(name + " = \\"" + value + "\\"");
    } else {
        ggbApplet.evalCommand("SetValue(" + name + ", \\"" + value + "\\")");
    }

    try {
        ggbApplet.setLabelVisible(name, false);
        ggbApplet.setVisible(name, false);
    } catch(e) {}
}

function buildCellBranching() {

    var ok = readCellBranchingControls();

    if (!ok) {
        return;
    }

    clearCellBranching();

    var startX = 0;
    var startY = 0;
    var startLength = 4;
    var startAngle = Math.PI / 2;

    growCellBranching(
        startX,
        startY,
        startLength,
        startAngle,
        1
    );

    var meanOffspring = CellB.p1 + 2 * CellB.p2;
    var survived = CellB.reachedFinalGeneration;
    var extinctEarly = 1 - survived;

    setCellNumber("CellTotalBranches", CellB.branchCount);
    setCellNumber("CellDeaths", CellB.deathCount);
    setCellNumber("CellDeathProbability", Number(CellB.p0.toFixed(2)));
    setCellNumber("CellQuiescenceProbability", Number(CellB.p1.toFixed(2)));
    setCellNumber("CellProliferationProbability", Number(CellB.p2.toFixed(2)));
    setCellNumber("CellMeanOffspring", Number(meanOffspring.toFixed(2)));
    setCellNumber("CellFinalGenerationReached", CellB.reachedFinalGeneration);

    if (CellB.reachedFinalGeneration === 1) {
        setCellText("CellReachedFinalText", "yes");
    } else {
        setCellText("CellReachedFinalText", "no");
    }

    setCellNumber("CellSurvived", survived);
    setCellNumber("CellExtinctEarly", extinctEarly);

    setCellNumber("CellCurrentP0", CellB.p0);
    setCellNumber("CellCurrentP1", CellB.p1);
    setCellNumber("CellCurrentP2", CellB.p2);
    setCellNumber("CellCurrentGenerations", CellB.generations);
    setCellNumber("CellCurrentLengthFactor", CellB.lengthFactor);
    setCellNumber("CellCurrentAngle", CellB.angle);
    setCellNumber("CellCurrentJitter", CellB.jitter);
    setCellNumber("CellCurrentMaxBranches", CellB.maxBranches);
}

function fmtCellStat(x) {
    return Number(x.toFixed(6));
}

function setObjectsVisibleByName(objectNames, visible) {

    if (!objectNames) {
        return;
    }

    for (var i = 0; i < objectNames.length; i++) {
        try {
            if (ggbApplet.exists(objectNames[i])) {
                ggbApplet.setVisible(objectNames[i], visible);
            }
        } catch(e) {}
    }
}

function hideObjectsWithPrefix(prefix) {

    for (var i = 0; i < ggbApplet.getObjectNumber(); i++) {
        try {
            var obj = ggbApplet.getObjectName(i);

            if (obj.indexOf(prefix) === 0) {
                ggbApplet.setVisible(obj, false);
            }
        } catch(e) {}
    }
}

function showObjectsWithPrefix(prefix) {

    for (var i = 0; i < ggbApplet.getObjectNumber(); i++) {
        try {
            var obj = ggbApplet.getObjectName(i);

            if (obj.indexOf(prefix) === 0) {
                ggbApplet.setVisible(obj, true);
            }
        } catch(e) {}
    }
}

function hideCellTreeRawVariables() {
    setObjectsVisibleByName(CellTreeRawVariables, false);
}

function hideCellStatsRawVariables() {
    setObjectsVisibleByName(CellStatsRawVariables, false);
}

function hideCellStatsDisplayObjects() {
    setObjectsVisibleByName(CellStatsDisplayObjects, false);
}

function showCellTreeDisplayObjects() {
    setObjectsVisibleByName(CellTreeDisplayObjects, true);
    setObjectsVisibleByName(CellStatsDisplayObjects, false);

    hideCellTreeRawVariables();
    hideCellStatsRawVariables();
}

function showCellStatsDisplayObjects() {
    setObjectsVisibleByName(CellTreeDisplayObjects, false);
    setObjectsVisibleByName(CellStatsDisplayObjects, true);

    hideCellTreeRawVariables();
    hideCellStatsRawVariables();
}

function hideAllCellDisplayObjects() {
    setObjectsVisibleByName(CellTreeDisplayObjects, false);
    setObjectsVisibleByName(CellStatsDisplayObjects, false);

    hideCellTreeRawVariables();
    hideCellStatsRawVariables();
}

function showCellBranchingTree() {

    showObjectsWithPrefix("CB_B_");
    showObjectsWithPrefix("CB_D_");

    hideObjectsWithPrefix("CBStat");

    showCellTreeDisplayObjects();
}

function showCellBranchingStats() {

    hideObjectsWithPrefix("CB_B_");
    hideObjectsWithPrefix("CB_D_");

    hideObjectsWithPrefix("CBStat");

    showCellStatsDisplayObjects();
}

function setCBStatNumber(name, value) {

    if (!ggbApplet.exists(name)) {
        ggbApplet.evalCommand(name + " = " + value);
    } else {
        ggbApplet.evalCommand("SetValue(" + name + ", " + value + ")");
    }

    try {
        ggbApplet.setLabelVisible(name, false);
        ggbApplet.setVisible(name, false);
    } catch(e) {}
}

function setCBStatText(name, value) {

    if (!ggbApplet.exists(name)) {
        ggbApplet.evalCommand(name + " = \\"" + value + "\\"");
    } else {
        ggbApplet.evalCommand("SetValue(" + name + ", \\"" + value + "\\")");
    }

    try {
        ggbApplet.setLabelVisible(name, false);
        ggbApplet.setVisible(name, false);
    } catch(e) {}
}

function ensureCellStatControls() {

    if (!ggbApplet.exists("cellP0")) {
        ggbApplet.evalCommand("cellP0 = 0.25");
        ggbApplet.setLabelVisible("cellP0", true);
    }

    if (!ggbApplet.exists("cellP2")) {
        ggbApplet.evalCommand("cellP2 = 0.45");
        ggbApplet.setLabelVisible("cellP2", true);
    }

    if (!ggbApplet.exists("cellGenerations")) {
        ggbApplet.evalCommand("cellGenerations = 20");
        ggbApplet.setLabelVisible("cellGenerations", true);
    }
}

function runCellBranchingStats() {

    ensureCellStatControls();

    var p0 = ggbApplet.getValue("cellP0");
    var p2 = ggbApplet.getValue("cellP2");
    var p1 = 1 - p0 - p2;

    var generations = Math.round(ggbApplet.getValue("cellGenerations"));
    var trials = 1000;

    if (p1 < 0) {
        alert(
            "Invalid probabilities.\\\\n\\\\n" +
            "cellP0 + cellP2 must be less than or equal to 1.\\\\n\\\\n" +
            "Current values give cellP1 = " + p1.toFixed(3)
        );
        return;
    }

    if (generations < 1) {
        generations = 1;
    }

    if (generations > 20) {
        alert("cellGenerations is large. Using 20 instead.");
        generations = 20;
    }

    if (trials < 1) {
        trials = 1;
    }

    var extinctCount = 0;
    var survivalCount = 0;

    var sumFinalPopulation = 0;
    var sumMaxPopulation = 0;
    var maxObservedPopulation = 0;

    var totalQuiescentRunLength = 0;
    var quiescentRunCount = 0;
    var maxQuiescentRun = 0;

    var quiescentExitsToDeath = 0;
    var quiescentExitsToProliferation = 0;

    function simulateOneTrial() {

        var cells = [
            { quiescentRun: 0 }
        ];

        var maxPopulation = cells.length;

        for (var gen = 1; gen <= generations; gen++) {

            var nextCells = [];

            for (var i = 0; i < cells.length; i++) {

                var currentRun = cells[i].quiescentRun;
                var u = Math.random();

                if (u < p0) {

                    if (currentRun > 0) {
                        totalQuiescentRunLength += currentRun;
                        quiescentRunCount++;

                        if (currentRun > maxQuiescentRun) {
                            maxQuiescentRun = currentRun;
                        }

                        quiescentExitsToDeath++;
                    }

                } else if (u < p0 + p1) {

                    nextCells.push({
                        quiescentRun: currentRun + 1
                    });

                } else {

                    if (currentRun > 0) {
                        totalQuiescentRunLength += currentRun;
                        quiescentRunCount++;

                        if (currentRun > maxQuiescentRun) {
                            maxQuiescentRun = currentRun;
                        }

                        quiescentExitsToProliferation++;
                    }

                    nextCells.push({ quiescentRun: 0 });
                    nextCells.push({ quiescentRun: 0 });
                }
            }

            cells = nextCells;

            if (cells.length > maxPopulation) {
                maxPopulation = cells.length;
            }

            if (cells.length === 0) {
                break;
            }
        }

        return {
            finalPopulation: cells.length,
            maxPopulation: maxPopulation,
            extinct: cells.length === 0
        };
    }

    for (var trial = 0; trial < trials; trial++) {

        var result = simulateOneTrial();

        if (result.extinct) {
            extinctCount++;
        } else {
            survivalCount++;
        }

        sumFinalPopulation += result.finalPopulation;
        sumMaxPopulation += result.maxPopulation;

        if (result.maxPopulation > maxObservedPopulation) {
            maxObservedPopulation = result.maxPopulation;
        }
    }

    var extinctionRate = extinctCount / trials;
    var survivalRate = survivalCount / trials;
    var meanFinalPopulation = sumFinalPopulation / trials;
    var meanMaxPopulation = sumMaxPopulation / trials;
    var meanOffspring = p1 + 2 * p2;

    var meanQuiescentRun = 0;

    if (quiescentRunCount > 0) {
        meanQuiescentRun =
            totalQuiescentRunLength / quiescentRunCount;
    }

    var quiescentExitTotal =
        quiescentExitsToDeath + quiescentExitsToProliferation;

    var quiescentExitDeathRate = 0;
    var quiescentExitProliferationRate = 0;

    if (quiescentExitTotal > 0) {
        quiescentExitDeathRate =
            quiescentExitsToDeath / quiescentExitTotal;

        quiescentExitProliferationRate =
            quiescentExitsToProliferation / quiescentExitTotal;
    }

    setCBStatNumber("CBStatTrials", trials);
    setCBStatNumber("CBStatGenerations", generations);

    setCBStatNumber("CBStatDeathProbability", fmtCellStat(p0));
    setCBStatNumber("CBStatQuiescenceProbability", fmtCellStat(p1));
    setCBStatNumber("CBStatProliferationProbability", fmtCellStat(p2));
    setCBStatNumber("CBStatMeanOffspring", fmtCellStat(meanOffspring));

    setCBStatNumber("CBStatExtinctions", extinctCount);
    setCBStatNumber("CBStatSurvivals", survivalCount);
    setCBStatNumber("CBStatExtinctionRate", fmtCellStat(extinctionRate));
    setCBStatNumber("CBStatSurvivalRate", fmtCellStat(survivalRate));

    setCBStatNumber("CBStatMeanFinalPopulation", fmtCellStat(meanFinalPopulation));
    setCBStatNumber("CBStatMeanMaxPopulation", fmtCellStat(meanMaxPopulation));
    setCBStatNumber("CBStatMaxObservedPopulation", maxObservedPopulation);

    setCBStatNumber("CBStatMeanQuiescentRun", fmtCellStat(meanQuiescentRun));
    setCBStatNumber("CBStatMaxQuiescentRun", maxQuiescentRun);
    setCBStatNumber("CBStatQuiescentRunCount", quiescentRunCount);

    setCBStatNumber("CBStatQuiescentExitsToDeath", quiescentExitsToDeath);
    setCBStatNumber("CBStatQuiescentExitsToProliferation", quiescentExitsToProliferation);

    setCBStatNumber("CBStatQuiescentExitDeathRate", fmtCellStat(quiescentExitDeathRate));
    setCBStatNumber("CBStatQuiescentExitProliferationRate",
        fmtCellStat(quiescentExitProliferationRate));

    setCBStatText("CBStatDisplayMode", "statistics");

    hideObjectsWithPrefix("CBStat");
    hideCellStatsRawVariables();
    hideCellStatsDisplayObjects();
}`;

    setOutputs(instructions, code, "", buttonInstructions);
}

function generateGeoGebraReactionDiffusion() {

    let instructions =
`Reaction-Diffusion Pattern Formation

This GeoGebra model shows a simple reaction-diffusion pattern-forming system.

It uses two quantities at each grid point:

U = background chemical / food
V = active chemical / pattern-former

The visible colour of each point represents the local amount of V.

The scientific idea:

Two substances spread across a surface while also reacting locally. One substance feeds the system, while the other grows, spreads, and is removed. The competition between local reaction and diffusion can produce organised patterns from a small initial disturbance.

Preset meanings:

Spots: tends toward separated local patches.
Maze: tends toward connected winding structures.
Stripes: tends toward broader banded structures.

Suggested workflow:

1. Press Setup.
2. Press Spots, Maze, or Stripes.
3. Press Step to continue evolving the current pattern.
4. Press Clear to remove the display.

This version uses a 30 x 30 point grid for improved pattern detail.

Use the GeoGebra Button Setup panel for the required button calls.`;

    let code =
`// GeoGebra Global JavaScript
// Reaction-Diffusion Pattern Formation
// Stable first version: 20 x 20 coloured point grid

var RD = {
    n: 30,
    spacing: 0.23,
    objects: [],
    U: [],
    V: [],
    nextU: [],
    nextV: [],
    generation: 0,
    presetName: "Spots",

    diffusionU: 0.16,
    diffusionV: 0.08,

    // Default visual preset: Spots
    feedRate: 0.035,
    killRate: 0.060,
    timeStep: 1.0
};

function rdIndex(i, j) {
    return i * RD.n + j;
}

function rdClamp(x, lo, hi) {
    if (x < lo) return lo;
    if (x > hi) return hi;
    return x;
}

function rdRound(x, places) {

    var factor = Math.pow(10, places);
    return Math.round(x * factor) / factor;
}

function rdSafeText(text) {

    return String(text).replace(/"/g, "'");
}

function rdWriteText(name, text, x, y) {

    try {
        if (ggbApplet.exists(name)) {
            ggbApplet.deleteObject(name);
        }

        var safe = rdSafeText(text);

        ggbApplet.evalCommand(name + ' = Text("' + safe + '", (' + x + ',' + y + '))');

        ggbApplet.setLabelVisible(name, false);
        ggbApplet.setColor(name, 40, 40, 40);
        ggbApplet.setVisible(name, true);

    } catch(e) {}
}

function updateReactionDiffusionCounter(meanV, maxV) {

    rdWriteText("RDTextTitle", "Reaction-Diffusion", 4.1, 3.0);
    rdWriteText("RDTextPreset", "Preset: " + RD.presetName, 4.1, 2.6);
    rdWriteText("RDTextGeneration", "Generation: " + RD.generation, 4.1, 2.2);

    // Delete old Mean V and Max V text objects if they exist.
    try {
        if (ggbApplet.exists("RDTextMeanV")) {
            ggbApplet.deleteObject("RDTextMeanV");
        }

        if (ggbApplet.exists("RDTextMaxV")) {
            ggbApplet.deleteObject("RDTextMaxV");
        }
    } catch(e) {}
}

function clearReactionDiffusion() {

    for (var i = ggbApplet.getObjectNumber() - 1; i >= 0; i--) {
        try {
            var obj = ggbApplet.getObjectName(i);

            if (obj.indexOf("RDCell") === 0 ||
                obj.indexOf("RDText") === 0 ||
                obj === "RDGeneration" ||
                obj === "RDMeanV" ||
                obj === "RDMaxV") {

                ggbApplet.deleteObject(obj);
            }
        } catch(e) {}
    }

    RD.objects = [];
    RD.U = [];
    RD.V = [];
    RD.nextU = [];
    RD.nextV = [];
    RD.generation = 0;
    RD.presetName = "None";
}

function createReactionDiffusionGrid() {

    clearReactionDiffusion();

    var n = RD.n;
    var s = RD.spacing;
    var offset = -n * s / 2;

    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {

            var name = "RDCell" + i + "x" + j;

            var x = offset + j * s;
            var y = offset + i * s;

            ggbApplet.evalCommand(name + " = (" + x + "," + y + ")");

            try {
                ggbApplet.setLabelVisible(name, false);
                ggbApplet.setPointSize(name, 6);
                ggbApplet.setPointStyle(name, 0);
                ggbApplet.setColor(name, 245, 245, 245);
            } catch(e) {}

            RD.objects.push(name);
        }
    }

    ggbApplet.evalCommand("RDGeneration = 0");
    ggbApplet.evalCommand("RDMeanV = 0");
    ggbApplet.evalCommand("RDMaxV = 0");

    try {
        ggbApplet.setVisible("RDGeneration", false);
        ggbApplet.setVisible("RDMeanV", false);
        ggbApplet.setVisible("RDMaxV", false);
    } catch(e) {}
}

function resetReactionDiffusion() {

    clearRDSeed();
    seedReactionDiffusionCentre();

    RD.generation = 0;

    updateReactionDiffusionDisplay();
}

function clearRDSeed() {

    if (RD.objects.length === 0) {
        createReactionDiffusionGrid();
    }

    var n = RD.n;

    RD.U = [];
    RD.V = [];
    RD.nextU = [];
    RD.nextV = [];

    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {

            var k = rdIndex(i, j);

            RD.U[k] = 1.0;
            RD.V[k] = 0.0;

            RD.nextU[k] = 1.0;
            RD.nextV[k] = 0.0;
        }
    }

    RD.generation = 0;

    updateReactionDiffusionDisplay();
}

function seedReactionDiffusionCentre() {

    if (RD.objects.length === 0) {
        createReactionDiffusionGrid();
    }

    var n = RD.n;
    var c = Math.floor(n / 2);

    for (var a = c - 2; a <= c + 2; a++) {
        for (var b = c - 2; b <= c + 2; b++) {

            if (a >= 0 && a < n && b >= 0 && b < n) {
                var kk = rdIndex(a, b);

                RD.U[kk] = 0.50;
                RD.V[kk] = 0.25 + Math.random() * 0.25;
            }
        }
    }

    // Slight random disturbance across the whole field.
    for (var r = 0; r < n; r++) {
        for (var q = 0; q < n; q++) {
            var idx = rdIndex(r, q);
            RD.V[idx] += Math.random() * 0.01;
        }
    }

    updateReactionDiffusionDisplay();
}

function presetRDSpots() {

    RD.diffusionU = 0.16;
    RD.diffusionV = 0.08;
    RD.feedRate = 0.035;
    RD.killRate = 0.060;
    RD.timeStep = 1.0;
    RD.presetName = "Spots";

    clearRDSeed();
    seedReactionDiffusionCentre();

    runReactionDiffusionSteps(20);
}

function presetRDMaze() {

    RD.diffusionU = 0.16;
    RD.diffusionV = 0.08;
    RD.feedRate = 0.029;
    RD.killRate = 0.057;
    RD.timeStep = 1.0;
    RD.presetName = "Maze";

    clearRDSeed();
    seedReactionDiffusionCentre();

    runReactionDiffusionSteps(20);
}

function presetRDStripes() {

    RD.diffusionU = 0.16;
    RD.diffusionV = 0.08;
    RD.feedRate = 0.022;
    RD.killRate = 0.051;
    RD.timeStep = 1.0;
    RD.presetName = "Stripes";

    clearRDSeed();
    seedReactionDiffusionCentre();

    runReactionDiffusionSteps(20);
}

function laplaceU(i, j) {

    var n = RD.n;
    var center = RD.U[rdIndex(i, j)];
    var sum = -1.0 * center;

    var up = (i - 1 + n) % n;
    var down = (i + 1) % n;
    var left = (j - 1 + n) % n;
    var right = (j + 1) % n;

    sum += 0.20 * RD.U[rdIndex(up, j)];
    sum += 0.20 * RD.U[rdIndex(down, j)];
    sum += 0.20 * RD.U[rdIndex(i, left)];
    sum += 0.20 * RD.U[rdIndex(i, right)];

    sum += 0.05 * RD.U[rdIndex(up, left)];
    sum += 0.05 * RD.U[rdIndex(up, right)];
    sum += 0.05 * RD.U[rdIndex(down, left)];
    sum += 0.05 * RD.U[rdIndex(down, right)];

    return sum;
}

function laplaceV(i, j) {

    var n = RD.n;
    var center = RD.V[rdIndex(i, j)];
    var sum = -1.0 * center;

    var up = (i - 1 + n) % n;
    var down = (i + 1) % n;
    var left = (j - 1 + n) % n;
    var right = (j + 1) % n;

    sum += 0.20 * RD.V[rdIndex(up, j)];
    sum += 0.20 * RD.V[rdIndex(down, j)];
    sum += 0.20 * RD.V[rdIndex(i, left)];
    sum += 0.20 * RD.V[rdIndex(i, right)];

    sum += 0.05 * RD.V[rdIndex(up, left)];
    sum += 0.05 * RD.V[rdIndex(up, right)];
    sum += 0.05 * RD.V[rdIndex(down, left)];
    sum += 0.05 * RD.V[rdIndex(down, right)];

    return sum;
}

function stepReactionDiffusion() {

    if (RD.objects.length === 0) {
        alert("Please press Setup first.");
        return;
    }

    if (RD.U.length === 0 || RD.V.length === 0) {
        alert("No active reaction-diffusion seed is present. Press Spots, Maze, or Stripes first.");
        return;
    }

    // Several internal updates before one visible redraw.
    // This makes the Step button visibly useful.
    var internalSteps = 20;

    for (var s = 0; s < internalSteps; s++) {

        var n = RD.n;

        for (var i = 0; i < n; i++) {
            for (var j = 0; j < n; j++) {

                var k = rdIndex(i, j);

                var u = RD.U[k];
                var v = RD.V[k];

                var uvv = u * v * v;

                var du =
                    RD.diffusionU * laplaceU(i, j)
                    - uvv
                    + RD.feedRate * (1 - u);

                var dv =
                    RD.diffusionV * laplaceV(i, j)
                    + uvv
                    - (RD.feedRate + RD.killRate) * v;

                RD.nextU[k] = rdClamp(u + du * RD.timeStep, 0, 1);
                RD.nextV[k] = rdClamp(v + dv * RD.timeStep, 0, 1);
            }
        }

        for (var m = 0; m < RD.n * RD.n; m++) {
            RD.U[m] = RD.nextU[m];
            RD.V[m] = RD.nextV[m];
        }

        RD.generation++;
    }

    updateReactionDiffusionDisplay();
}

function runReactionDiffusionSteps(steps) {

    if (RD.objects.length === 0 || RD.U.length === 0 || RD.V.length === 0) {
        resetReactionDiffusion();
    }

    steps = Math.round(steps);

    if (steps < 1) {
        steps = 1;
    }

    if (steps > 25) {
        alert("Too many steps at once for this first GeoGebra version. Using 25.");
        steps = 25;
    }

    for (var i = 0; i < steps; i++) {
        stepReactionDiffusion();
    }
}

function updateReactionDiffusionDisplay() {

    var n = RD.n;

    var sumV = 0;
    var maxV = 0;

    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {

            var k = rdIndex(i, j);
            var v = RD.V[k];

            sumV += v;

            if (v > maxV) {
                maxV = v;
            }

            var name = "RDCell" + i + "x" + j;

            // Gentler colour scale.
            // Low V: pale grey.
            // High V: blue-purple.
            var intensity = rdClamp(v * 3.0, 0, 1);

            var red = Math.round(250 - 180 * intensity);
            var green = Math.round(250 - 210 * intensity);
            var blue = Math.round(250 - 40 * intensity);

            try {
                ggbApplet.setColor(name, red, green, blue);
                ggbApplet.setPointSize(name, 6);
                ggbApplet.setLabelVisible(name, false);
            } catch(e) {}
        }
    }

    var meanV = sumV / (n * n);

    if (!ggbApplet.exists("RDGeneration")) {
        ggbApplet.evalCommand("RDGeneration = " + RD.generation);
    } else {
        ggbApplet.evalCommand("SetValue(RDGeneration, " + RD.generation + ")");
    }

    if (!ggbApplet.exists("RDMeanV")) {
        ggbApplet.evalCommand("RDMeanV = " + meanV);
    } else {
        ggbApplet.evalCommand("SetValue(RDMeanV, " + meanV + ")");
    }

    if (!ggbApplet.exists("RDMaxV")) {
        ggbApplet.evalCommand("RDMaxV = " + maxV);
    } else {
        ggbApplet.evalCommand("SetValue(RDMaxV, " + maxV + ")");
    }

    try {
        ggbApplet.setVisible("RDGeneration", false);
        ggbApplet.setVisible("RDMeanV", false);
        ggbApplet.setVisible("RDMaxV", false);
    } catch(e) {}
    
    updateReactionDiffusionCounter(meanV, maxV);
}

function setupReactionDiffusion() {

    RD.presetName = "Initial seed";

    createReactionDiffusionGrid();
    resetReactionDiffusion();

    alert(
        "Reaction-Diffusion point grid created.\\n\\n" +
        "Use Spots, Maze, or Stripes to choose a developed pattern.\\n" +
        "Use Step to advance the current pattern.\\n\\n" +
        "This version uses a 30 x 30 grid of coloured points."
    );
}`;

    let buttonInstructions =
`Create these GeoGebra buttons.

Button label:
Setup

On Click JavaScript:
setupReactionDiffusion();

Button label:
Spots

On Click JavaScript:
presetRDSpots();

Button label:
Maze

On Click JavaScript:
presetRDMaze();

Button label:
Stripes

On Click JavaScript:
presetRDStripes();

Button label:
Step

On Click JavaScript:
stepReactionDiffusion();

Button label:
Clear

On Click JavaScript:
clearReactionDiffusion();
`;

    setOutputs(instructions, code, "", buttonInstructions);

}

function generateGeoGebraDiffusionLimitedAggregation() {

    let instructions =
`Diffusion-Limited Aggregation

This GeoGebra model shows a simple diffusion-limited aggregation process.

Scientific idea:

Particles wander randomly. When a wandering particle touches the existing cluster, it sticks permanently. Repeating this many times can create branching, coral-like, mineral-like, or lightning-like structures.

Suggested workflow:

1. Press Setup.
2. Press Run 50.
3. Press Run 50 again, or Run 200 for faster growth.
4. Press Clear to remove the display.

This first version uses point objects for stability.

Use the GeoGebra Button Setup panel for the required button calls.`;

    let code =
`// GeoGebra Global JavaScript
// Diffusion-Limited Aggregation
// First point-based version

var DLA = {
    objects: [],
    occupied: {},
    particles: [],
    count: 0,
    attempted: 0,
    unattached: 0,

    modeName: "Branching Growth",
    attachmentThreshold: 1,

    maxRadius: 1,
    releasePadding: 8,
    killPadding: 18,
    minimumReleaseRadius: 12,
    stepLimit: 3000,
    spacing: 0.12
};

function dlaKey(x, y) {
    return x + "," + y;
}

function dlaIsOccupied(x, y) {
    return DLA.occupied[dlaKey(x, y)] === true;
}

function dlaSetOccupied(x, y) {
    DLA.occupied[dlaKey(x, y)] = true;
}

function dlaHasOccupiedNeighbour(x, y) {

    if (dlaIsOccupied(x + 1, y)) return true;
    if (dlaIsOccupied(x - 1, y)) return true;
    if (dlaIsOccupied(x, y + 1)) return true;
    if (dlaIsOccupied(x, y - 1)) return true;

    if (dlaIsOccupied(x + 1, y + 1)) return true;
    if (dlaIsOccupied(x + 1, y - 1)) return true;
    if (dlaIsOccupied(x - 1, y + 1)) return true;
    if (dlaIsOccupied(x - 1, y - 1)) return true;

    return false;
}

function dlaOccupiedNeighbourCount(x, y) {

    var count = 0;

    if (dlaIsOccupied(x + 1, y)) count++;
    if (dlaIsOccupied(x - 1, y)) count++;
    if (dlaIsOccupied(x, y + 1)) count++;
    if (dlaIsOccupied(x, y - 1)) count++;

    if (dlaIsOccupied(x + 1, y + 1)) count++;
    if (dlaIsOccupied(x + 1, y - 1)) count++;
    if (dlaIsOccupied(x - 1, y + 1)) count++;
    if (dlaIsOccupied(x - 1, y - 1)) count++;

    return count;
}

function dlaDistanceSquared(x, y) {
    return x * x + y * y;
}

function getDLAReleaseRadius() {

    var r = DLA.maxRadius + DLA.releasePadding;

    if (r < DLA.minimumReleaseRadius) {
        r = DLA.minimumReleaseRadius;
    }

    return Math.round(r);
}

function getDLAKillRadius() {

    return getDLAReleaseRadius() + DLA.killPadding;
}

function clearDLA() {

    for (var i = ggbApplet.getObjectNumber() - 1; i >= 0; i--) {
        try {
            var obj = ggbApplet.getObjectName(i);

            if (obj.indexOf("DLAP") === 0 ||
                obj.indexOf("DLAText") === 0) {
                ggbApplet.deleteObject(obj);
            }
        } catch(e) {}
    }

    DLA.objects = [];
    DLA.occupied = {};
    DLA.particles = [];
    DLA.count = 0;
    DLA.attempted = 0;
    DLA.unattached = 0;
    DLA.maxRadius = 1;
}

function setupDLA() {

    clearDLA();

    addDLAParticle(0, 0, true);

    updateDLAText();

    alert(
        "DLA setup complete.\\n\\n" +
        "The red point is the original seed.\\n" +
        "Run walkers to let drifting particles attach to the growing deposit."
    );
}

function setDLABranchingGrowth() {

    DLA.modeName = "Branching Growth";
    DLA.attachmentThreshold = 1;

    updateDLAText();

    alert(
        "Branching Growth selected.\\n\\n" +
        "A drifting particle attaches when it touches at least one particle in the growing deposit."
    );
}

function setDLACompactGrowth() {

    DLA.modeName = "Compact Growth";
    DLA.attachmentThreshold = 2;

    updateDLAText();

    alert(
        "Compact Growth selected.\\n\\n" +
        "After a small starter deposit forms, a drifting particle attaches only when it touches at least two particles in the growing deposit.\\n\\n" +
        "This tends to fill gaps and produce a denser deposit."
    );
}

function addDLAParticle(x, y, isSeed) {

    var name = "DLAP" + DLA.count;

    var px = x * DLA.spacing;
    var py = y * DLA.spacing;

    ggbApplet.evalCommand(name + " = (" + px + "," + py + ")");

    var dist = Math.sqrt(dlaDistanceSquared(x, y));

    if (dist > DLA.maxRadius) {
        DLA.maxRadius = dist;
    }

    try {
        ggbApplet.setLabelVisible(name, false);
        ggbApplet.setPointStyle(name, 0);

        if (isSeed) {
            ggbApplet.setPointSize(name, 7);
            ggbApplet.setColor(name, 220, 40, 40);
        } else {
            ggbApplet.setPointSize(name, 4);

            var releaseRadius = getDLAReleaseRadius();
            var t = Math.min(1, dist / releaseRadius);

            var red = Math.round(40 + 120 * t);
            var green = Math.round(80 + 80 * t);
            var blue = Math.round(220 - 80 * t);

            ggbApplet.setColor(name, red, green, blue);
        }
    } catch(e) {}

    DLA.objects.push(name);
    DLA.particles.push({x: x, y: y});
    dlaSetOccupied(x, y);

    DLA.count++;
}

function randomDLAStart() {

    var angle = Math.random() * 2 * Math.PI;
    var releaseRadius = getDLAReleaseRadius();

    var x = Math.round(releaseRadius * Math.cos(angle));
    var y = Math.round(releaseRadius * Math.sin(angle));

    return {x: x, y: y};
}

function randomDLAStep(pos) {

    var r = Math.floor(Math.random() * 4);

    if (r === 0) {
        pos.x++;
    } else if (r === 1) {
        pos.x--;
    } else if (r === 2) {
        pos.y++;
    } else {
        pos.y--;
    }
}

function releaseOneDLAWalker() {

    if (DLA.count === 0) {
        setupDLA();
    }

    var pos = randomDLAStart();

    for (var step = 0; step < DLA.stepLimit; step++) {

        randomDLAStep(pos);

        var killRadius = getDLAKillRadius();

        if (dlaDistanceSquared(pos.x, pos.y) > killRadius * killRadius) {
            pos = randomDLAStart();
        }

        var neighbourCount = dlaOccupiedNeighbourCount(pos.x, pos.y);

        var requiredNeighbours = DLA.attachmentThreshold;

        // Compact Growth needs a small starter deposit.
        // With only one seed particle, no walker can touch two deposit particles.
        if (DLA.count < 6) {
            requiredNeighbours = 1;
        }

        if (neighbourCount >= requiredNeighbours) {

            if (!dlaIsOccupied(pos.x, pos.y)) {
                addDLAParticle(pos.x, pos.y, false);
                return true;
            }
        }
    }

    return false;
}

function runDLAWalkers(n) {

    n = Math.round(n);

    if (n < 1) {
        n = 1;
    }

    if (n > 300) {
        alert("Too many walkers at once for this first GeoGebra version. Using 300.");
        n = 300;
    }

    for (var i = 0; i < n; i++) {

        DLA.attempted++;

        if (!releaseOneDLAWalker()) {
            DLA.unattached++;
        }
    }

    updateDLAText();
}

function dlaWriteText(name, text, x, y) {

    try {
        if (ggbApplet.exists(name)) {
            ggbApplet.deleteObject(name);
        }

        var safe = String(text).replace(/"/g, "'");

        ggbApplet.evalCommand(name + ' = Text("' + safe + '", (' + x + ',' + y + '))');

        ggbApplet.setLabelVisible(name, false);
        ggbApplet.setColor(name, 40, 40, 40);
        ggbApplet.setVisible(name, true);

    } catch(e) {}
}

function updateDLAText() {

    var attachedWalkers = DLA.count - 1;

    if (attachedWalkers < 0) {
        attachedWalkers = 0;
    }

    dlaWriteText("DLATextTitle", "Diffusion-Limited Aggregation", 4.0, 3.4);
    dlaWriteText("DLATextMode", "Mode: " + DLA.modeName, 4.0, 3.0);
    dlaWriteText("DLATextDeposit", "Deposit particles: " + DLA.count, 4.0, 2.6);
    dlaWriteText("DLATextAttached", "Attached walkers: " + attachedWalkers, 4.0, 2.2);
    dlaWriteText("DLATextReleased", "Released walkers: " + DLA.attempted, 4.0, 1.8);
    dlaWriteText("DLATextUnattached", "Unattached walkers: " + DLA.unattached, 4.0, 1.4);
    dlaWriteText("DLATextIdea", "Drifting particles attach to a growing deposit", 4.0, 1.0);
}`;

    let buttonInstructions =
`Create these GeoGebra buttons.

Button label:
Setup

On Click JavaScript:
setupDLA();

Button label:
Run 50

On Click JavaScript:
runDLAWalkers(50);

Button label:
Run 200

On Click JavaScript:
runDLAWalkers(200);

Button label:
Clear

On Click JavaScript:
clearDLA();
`;

    setOutputs(instructions, code, "", buttonInstructions);
}

function generateGeoGebraSierpinskiIcosahedron() {

    let instructions =
`Sierpinski Icosahedron

This model builds a recursive 3D Sierpinski-style icosahedron.

Paste the JavaScript code from the GeoGebra Global JavaScript panel
into GeoGebra's Global JavaScript section.

Use the GeoGebra Button Setup panel for the required button calls.

Suggested workflow:

1. Press Setup.
2. Press Build.
3. Press Clear if you want to remove the construction.

Higher recursion orders create many objects and may slow GeoGebra.`;

    let code =
`// GeoGebra Global JavaScript
// Sierpinski Icosahedron
// Stage 2A: regular icosahedron plus Sierpinski pattern on all 20 faces

var SI = {
    objects: [],
    pointCount: 0,
    segmentCount: 0,
    scale: 1.6,
    order: 2,
    angleName: "SIAngle"
};

function fmtSI(x) {
    return Number(x.toFixed(5));
}

function ensureSIAngle() {

    try {
        if (!ggbApplet.exists(SI.angleName)) {
            ggbApplet.evalCommand(SI.angleName + " = 0");
        }

        ggbApplet.setVisible(SI.angleName, true);
        ggbApplet.setLabelVisible(SI.angleName, true);

    } catch(e) {}
}

function clearSierpinskiIcosahedron() {

    for (var i = ggbApplet.getObjectNumber() - 1; i >= 0; i--) {
        try {
            var obj = ggbApplet.getObjectName(i);

            if (obj.indexOf("SI") === 0 && obj !== SI.angleName) {
                ggbApplet.deleteObject(obj);
            }
        } catch(e) {}
    }

    SI.objects = [];
    SI.pointCount = 0;
    SI.segmentCount = 0;
}

function makeSIPoint(p, visiblePoint) {

    var name = "SIP" + SI.pointCount;

    var x = fmtSI(p.x);
    var y = fmtSI(p.y);
    var z = fmtSI(p.z);

    // Rotation around the z-axis:
    // x' = x cos(angle) - y sin(angle)
    // y' = x sin(angle) + y cos(angle)
    // z' = z
    ggbApplet.evalCommand(
        name + " = (" +
        "(" + x + ")*cos(" + SI.angleName + ") - (" + y + ")*sin(" + SI.angleName + ")," +
        "(" + x + ")*sin(" + SI.angleName + ") + (" + y + ")*cos(" + SI.angleName + ")," +
        z +
        ")"
    );

    try {
        ggbApplet.setLabelVisible(name, false);

        if (visiblePoint) {
            ggbApplet.setPointSize(name, 3);
            ggbApplet.setColor(name, 40, 40, 40);
        } else {
            ggbApplet.setVisible(name, false);
        }
    } catch(e) {}

    SI.objects.push(name);
    SI.pointCount++;

    return name;
}

function makeSISegment(a, b, red, green, blue, thickness) {

    var p1 = makeSIPoint(a, false);
    var p2 = makeSIPoint(b, false);

    var name = "SISeg" + SI.segmentCount;

    ggbApplet.evalCommand(name + " = Segment(" + p1 + "," + p2 + ")");

    try {
        ggbApplet.setLabelVisible(name, false);
        ggbApplet.setColor(name, red, green, blue);
        ggbApplet.setLineThickness(name, thickness);
    } catch(e) {}

    SI.objects.push(name);
    SI.segmentCount++;

    return name;
}

function midSI(a, b) {

    return {
        x: (a.x + b.x) / 2,
        y: (a.y + b.y) / 2,
        z: (a.z + b.z) / 2
    };
}

function drawTriangleSI(a, b, c, red, green, blue, thickness) {

    makeSISegment(a, b, red, green, blue, thickness);
    makeSISegment(b, c, red, green, blue, thickness);
    makeSISegment(c, a, red, green, blue, thickness);
}

function drawFilledTriangleSI(a, b, c, red, green, blue, opacity) {

    var p1 = makeSIPoint(a, false);
    var p2 = makeSIPoint(b, false);
    var p3 = makeSIPoint(c, false);

    var name = "SIFace" + SI.segmentCount;

    ggbApplet.evalCommand(name + " = Polygon(" + p1 + "," + p2 + "," + p3 + ")");

    try {
        ggbApplet.setLabelVisible(name, false);
        ggbApplet.setColor(name, red, green, blue);
        ggbApplet.setFilling(name, opacity);
        ggbApplet.setLineThickness(name, 1);
    } catch(e) {}

    SI.objects.push(name);
    SI.segmentCount++;

    return name;
}

function drawShellFaceSI(a, b, c) {

    var p1 = makeSIPoint(a, false);
    var p2 = makeSIPoint(b, false);
    var p3 = makeSIPoint(c, false);

    var name = "SIShell" + SI.segmentCount;

    ggbApplet.evalCommand(
        name + " = Polygon(" + p1 + "," + p2 + "," + p3 + ")"
    );

    try {
        ggbApplet.setLabelVisible(name, false);

        // Light shell colour
        ggbApplet.setColor(name, 150, 170, 210);

        // Light but visible shell fill
        ggbApplet.setFilling(name, 0.18);

        // Thin shell edges
        ggbApplet.setLineThickness(name, 2);
    } catch(e) {}

    SI.objects.push(name);
    SI.segmentCount++;
}

function drawSierpinskiFaceSI(a, b, c, depth) {

    if (depth <= 0) {

        // drawFilledTriangleSI(a, b, c, 95, 145, 235, 0.55);
        drawFilledTriangleSI(a, b, c, 95, 145, 235, 0.45);

        return;
    }

    var ab = midSI(a, b);
    var bc = midSI(b, c);
    var ca = midSI(c, a);

    drawSierpinskiFaceSI(a, ab, ca, depth - 1);
    drawSierpinskiFaceSI(ab, b, bc, depth - 1);
    drawSierpinskiFaceSI(ca, bc, c, depth - 1);
}

function makeIcosahedronVerticesSI() {

    var phi = (1 + Math.sqrt(5)) / 2;
    var s = SI.scale;

    return [
        {x:-1*s, y: phi*s, z:0},
        {x: 1*s, y: phi*s, z:0},
        {x:-1*s, y:-phi*s, z:0},
        {x: 1*s, y:-phi*s, z:0},

        {x:0, y:-1*s, z: phi*s},
        {x:0, y: 1*s, z: phi*s},
        {x:0, y:-1*s, z:-phi*s},
        {x:0, y: 1*s, z:-phi*s},

        {x: phi*s, y:0, z:-1*s},
        {x: phi*s, y:0, z: 1*s},
        {x:-phi*s, y:0, z:-1*s},
        {x:-phi*s, y:0, z: 1*s}
    ];
}

function makeIcosahedronFacesSI() {

    return [
        [0,11,5],
        [0,5,1],
        [0,1,7],
        [0,7,10],
        [0,10,11],

        [1,5,9],
        [5,11,4],
        [11,10,2],
        [10,7,6],
        [7,1,8],

        [3,9,4],
        [3,4,2],
        [3,2,6],
        [3,6,8],
        [3,8,9],

        [4,9,5],
        [2,4,11],
        [6,2,10],
        [8,6,7],
        [9,8,1]
    ];
}

function drawIcosahedronFrameSI(vertices, faces) {

    var edgeSeen = {};

    for (var i = 0; i < faces.length; i++) {

        var f = faces[i];

        for (var j = 0; j < 3; j++) {

            var aIndex = f[j];
            var bIndex = f[(j + 1) % 3];

            var key;

            if (aIndex < bIndex) {
                key = aIndex + "-" + bIndex;
            } else {
                key = bIndex + "-" + aIndex;
            }

            if (!edgeSeen[key]) {
                edgeSeen[key] = true;
                makeSISegment(vertices[aIndex], vertices[bIndex], 20, 20, 20, 5);
            }
        }
    }
}

function drawIcosahedronVerticesSI(vertices) {

    for (var i = 0; i < vertices.length; i++) {

        var name = "SIVertex" + i;
        var p = vertices[i];

        ggbApplet.evalCommand(
            name + " = (" +
            fmtSI(p.x) + "," +
            fmtSI(p.y) + "," +
            fmtSI(p.z) + ")"
        );

        try {
            ggbApplet.setLabelVisible(name, false);
            ggbApplet.setPointSize(name, 4);
            ggbApplet.setColor(name, 20, 20, 20);
        } catch(e) {}

        SI.objects.push(name);
    }
}

function writeSIText(name, text, x, y) {

    try {
        if (ggbApplet.exists(name)) {
            ggbApplet.deleteObject(name);
        }

        var safe = String(text).replace(/"/g, "'");

        ggbApplet.evalCommand(name + ' = Text("' + safe + '", (' + x + ',' + y + '))');

        ggbApplet.setLabelVisible(name, false);
        ggbApplet.setColor(name, 40, 40, 40);
        ggbApplet.setVisible(name, true);
Mo
    } catch(e) {}
}

function updateSIText() {

    writeSIText("SITextTitle", "Sierpinski Icosahedron", 3.6, 3.0);
    writeSIText("SITextStage", "All faces decorated", 3.6, 2.6);
    writeSIText("SITextOrder", "Sierpinski order: " + SI.order, 3.6, 2.2);
    writeSIText("SITextIdea", "Fractal subdivision on a regular solid", 3.6, 1.8);
}

function startSIRotation() {

    ensureSIAngle();

    try {
        ggbApplet.evalCommand("SetValue(" + SI.angleName + ", 0)");
        ggbApplet.evalCommand("StartAnimation(" + SI.angleName + ", true)");
    } catch(e) {
        alert("Could not start rotation. Try making SIAngle into a visible slider first.");
    }
}

function stopSIRotation() {

    try {
        ggbApplet.evalCommand("StartAnimation(" + SI.angleName + ", false)");
    } catch(e) {}
}

function resetSIRotation() {

    ensureSIAngle();

    try {
        ggbApplet.evalCommand("SetValue(" + SI.angleName + ", 0)");
    } catch(e) {}
}

function setupSierpinskiIcosahedron() {

    clearSierpinskiIcosahedron();

    ensureSIAngle();

    var vertices = makeIcosahedronVerticesSI();
    var faces = makeIcosahedronFacesSI();

    for (var i = 0; i < faces.length; i++) {

        var f = faces[i];

        var a = vertices[f[0]];
        var b = vertices[f[1]];
        var c = vertices[f[2]];

        drawSierpinskiFaceSI(a, b, c, SI.order);
    }

    updateSIText();

    alert(
        "Sierpinski Icosahedron created.\\n\\n" +
        "All 20 triangular faces have been decorated with filled Sierpinski patterns."
    );
}`;

    const blenderSIOrder = Number(document.getElementById("blenderSIOrder").value);
    const blenderSIRadius = Number(document.getElementById("blenderSIRadius").value);
    const blenderSIEdgeThickness = Number(document.getElementById("blenderSIEdgeThickness").value);
    const blenderSISphereRadius = Number(document.getElementById("blenderSISphereRadius").value);
    const blenderSITorusMajor = Number(document.getElementById("blenderSITorusMajor").value);
    const blenderSITorusMinor = Number(document.getElementById("blenderSITorusMinor").value);

    let blenderCode = `import bpy
import math
from mathutils import Vector

# --------------------------------------------------
# Parameters
# --------------------------------------------------

ORDER = ${blenderSIOrder}
RADIUS = ${blenderSIRadius}
EDGE_THICKNESS = ${blenderSIEdgeThickness}
ANIMATION_END = 240

FACE_COLOR = (0.12, 0.35, 0.85, 1.00)
EDGE_COLOR = (0.02, 0.02, 0.02, 1.00)
BG_COLOR = (0.035, 0.035, 0.04, 1.00)

# --------------------------------------------------
# Utility cleanup
# --------------------------------------------------

def remove_si_objects():
    for obj in list(bpy.data.objects):
        if obj.name.startswith("SI_"):
            bpy.data.objects.remove(obj, do_unlink=True)

    for mesh in list(bpy.data.meshes):
        if mesh.name.startswith("SI_"):
            bpy.data.meshes.remove(mesh, do_unlink=True)

    for curve in list(bpy.data.curves):
        if curve.name.startswith("SI_"):
            bpy.data.curves.remove(curve, do_unlink=True)

    for cam in list(bpy.data.cameras):
        if cam.name.startswith("SI_"):
            bpy.data.cameras.remove(cam, do_unlink=True)

    for light in list(bpy.data.lights):
        if light.name.startswith("SI_"):
            bpy.data.lights.remove(light, do_unlink=True)

remove_si_objects()

# --------------------------------------------------
# Materials
# --------------------------------------------------

def make_material(name, rgba, roughness=0.42, metallic=0.0, alpha=1.0):
    mat = bpy.data.materials.get(name)
    if mat is None:
        mat = bpy.data.materials.new(name=name)

    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links

    for node in list(nodes):
        nodes.remove(node)

    output = nodes.new(type="ShaderNodeOutputMaterial")
    output.location = (300, 0)

    bsdf = nodes.new(type="ShaderNodeBsdfPrincipled")
    bsdf.location = (0, 0)

    bsdf.inputs["Base Color"].default_value = rgba
    bsdf.inputs["Roughness"].default_value = roughness
    bsdf.inputs["Metallic"].default_value = metallic
    if "Alpha" in bsdf.inputs:
        bsdf.inputs["Alpha"].default_value = alpha

    links.new(bsdf.outputs["BSDF"], output.inputs["Surface"])

    mat.blend_method = "BLEND" if alpha < 1.0 else "OPAQUE"

    return mat

face_mat = make_material(
    "SI_Blue_Faces",
    FACE_COLOR,
    roughness=0.42,
    metallic=0.0,
    alpha=1.0
)

edge_mat = make_material(
    "SI_Dark_Edges",
    EDGE_COLOR,
    roughness=0.35,
    metallic=0.0,
    alpha=1.0
)

# --------------------------------------------------
# Geometry helpers
# --------------------------------------------------

def normalize_to_radius(v, radius):
    if v.length == 0:
        return Vector((0, 0, radius))
    return v.normalized() * radius

def key_from_vector(v, digits=6):
    return (round(v.x, digits), round(v.y, digits), round(v.z, digits))

def midpoint_on_sphere(a, b, radius):
    return (a + b) * 0.5

def subdivide_face(a, b, c, order, radius):
    if order == 0:
        return [(a, b, c)]

    ab = midpoint_on_sphere(a, b, radius)
    bc = midpoint_on_sphere(b, c, radius)
    ca = midpoint_on_sphere(c, a, radius)

    faces = []
    faces.extend(subdivide_face(a, ab, ca, order - 1, radius))
    faces.extend(subdivide_face(ab, b, bc, order - 1, radius))
    faces.extend(subdivide_face(ca, bc, c, order - 1, radius))
    faces.extend(subdivide_face(ab, bc, ca, order - 1, radius))
    return faces

# --------------------------------------------------
# Icosahedron base
# --------------------------------------------------

phi = (1 + math.sqrt(5)) / 2

base_vertices = [
    Vector((-1,  phi,  0)),
    Vector(( 1,  phi,  0)),
    Vector((-1, -phi,  0)),
    Vector(( 1, -phi,  0)),
    Vector(( 0, -1,  phi)),
    Vector(( 0,  1,  phi)),
    Vector(( 0, -1, -phi)),
    Vector(( 0,  1, -phi)),
    Vector(( phi,  0, -1)),
    Vector(( phi,  0,  1)),
    Vector((-phi,  0, -1)),
    Vector((-phi,  0,  1)),
]

base_vertices = [normalize_to_radius(v, RADIUS) for v in base_vertices]

base_faces = [
    (0, 11, 5),
    (0, 5, 1),
    (0, 1, 7),
    (0, 7, 10),
    (0, 10, 11),
    (1, 5, 9),
    (5, 11, 4),
    (11, 10, 2),
    (10, 7, 6),
    (7, 1, 8),
    (3, 9, 4),
    (3, 4, 2),
    (3, 2, 6),
    (3, 6, 8),
    (3, 8, 9),
    (4, 9, 5),
    (2, 4, 11),
    (6, 2, 10),
    (8, 6, 7),
    (9, 8, 1),
]

# --------------------------------------------------
# Build all Sierpinski triangles
# --------------------------------------------------

all_triangles = []

for f in base_faces:
    a = base_vertices[f[0]]
    b = base_vertices[f[1]]
    c = base_vertices[f[2]]
    all_triangles.extend(subdivide_face(a, b, c, ORDER, RADIUS))

# Keep only the outward corner triangles for Sierpinski-style shell
def sierpinski_filter(triangles, order):
    if order <= 0:
        return triangles

    current = triangles
    for _ in range(order):
        next_level = []
        for tri in current:
            a, b, c = tri
            ab = midpoint_on_sphere(a, b, RADIUS)
            bc = midpoint_on_sphere(b, c, RADIUS)
            ca = midpoint_on_sphere(c, a, RADIUS)

            next_level.append((a, ab, ca))
            next_level.append((ab, b, bc))
            next_level.append((ca, bc, c))
        current = next_level

    return current

# Rebuild correctly as Sierpinski triangles directly
def sierpinski_face(a, b, c, order, radius):
    if order == 0:
        return [(a, b, c)]

    ab = midpoint_on_sphere(a, b, radius)
    bc = midpoint_on_sphere(b, c, radius)
    ca = midpoint_on_sphere(c, a, radius)

    faces = []
    faces.extend(sierpinski_face(a, ab, ca, order - 1, radius))
    faces.extend(sierpinski_face(ab, b, bc, order - 1, radius))
    faces.extend(sierpinski_face(ca, bc, c, order - 1, radius))
    return faces

all_triangles = []
for f in base_faces:
    a = base_vertices[f[0]]
    b = base_vertices[f[1]]
    c = base_vertices[f[2]]
    all_triangles.extend(sierpinski_face(a, b, c, ORDER, RADIUS))

# --------------------------------------------------
# Solid mesh
# --------------------------------------------------

vertex_lookup = {}
solid_vertices = []
solid_faces = []

for tri in all_triangles:
    face_indices = []
    for v in tri:
        k = key_from_vector(v)
        if k not in vertex_lookup:
            vertex_lookup[k] = len(solid_vertices)
            solid_vertices.append((v.x, v.y, v.z))
        face_indices.append(vertex_lookup[k])
    solid_faces.append(tuple(face_indices))

solid_mesh = bpy.data.meshes.new("SI_SolidMesh")
solid_mesh.from_pydata(solid_vertices, [], solid_faces)
solid_mesh.update()

SI_Solid = bpy.data.objects.new("SI_Solid", solid_mesh)
bpy.context.collection.objects.link(SI_Solid)

SI_Solid.data.materials.append(face_mat)

for poly in SI_Solid.data.polygons:
    poly.use_smooth = False

# --------------------------------------------------
# Edge curve object
# --------------------------------------------------

seen_edges = set()

for tri in all_triangles:
    tri_keys = [key_from_vector(v) for v in tri]
    edge_triplets = [
        (tri_keys[0], tri_keys[1]),
        (tri_keys[1], tri_keys[2]),
        (tri_keys[2], tri_keys[0]),
    ]

    for e in edge_triplets:
        seen_edges.add(tuple(sorted(e)))

edge_curve = bpy.data.curves.new("SI_EdgesCurve", type="CURVE")
edge_curve.dimensions = "3D"
edge_curve.bevel_depth = EDGE_THICKNESS
edge_curve.bevel_resolution = 4
edge_curve.fill_mode = "FULL"
edge_curve.resolution_u = 1

for e in seen_edges:
    p1 = e[0]
    p2 = e[1]

    spline = edge_curve.splines.new(type="POLY")
    spline.points.add(1)
    spline.points[0].co = (p1[0], p1[1], p1[2], 1.0)
    spline.points[1].co = (p2[0], p2[1], p2[2], 1.0)

SI_Edges = bpy.data.objects.new("SI_Edges", edge_curve)
bpy.context.collection.objects.link(SI_Edges)
SI_Edges.data.materials.append(edge_mat)

# --------------------------------------------------
# Rotation Empty
# --------------------------------------------------

empty = bpy.data.objects.new("SI_Rotation_Empty", None)
bpy.context.collection.objects.link(empty)
empty.empty_display_type = "PLAIN_AXES"
empty.empty_display_size = 1.5
empty.location = (0, 0, 0)

SI_Solid.parent = empty
SI_Edges.parent = empty

${blenderCenterSpherePython({
    objectName: "SI_CenterSphere",
    materialName: "SI_Center_Red",
    parentName: "SI_Rotation_Empty",
    radius: blenderSISphereRadius,
    red: 0.9,
    green: 0.05,
    blue: 0.03,
    alpha: 1.0,
    roughness: 0.25,
    metallic: 0.0
})}

${blenderTorusPython({
    objectName: "SI_Torus",
    materialName: "SI_Torus_Orange",
    parentName: "SI_Rotation_Empty",
    majorRadius: blenderSITorusMajor,
    minorRadius: blenderSITorusMinor,
    majorSegments: 96,
    minorSegments: 36,
    rotX: 0.0,
    rotY: 0.0,
    rotZ: 0.0,
    red: 0.95,
    green: 0.55,
    blue: 0.10,
    alpha: 1.0,
    roughness: 0.30,
    metallic: 0.05
})}

# --------------------------------------------------
# Camera
# --------------------------------------------------

cam_data = bpy.data.cameras.new("SI_CameraData")
cam_data.lens = 35
cam_data.clip_start = 0.1
cam_data.clip_end = 2000

SI_Camera = bpy.data.objects.new("SI_Camera", cam_data)
bpy.context.collection.objects.link(SI_Camera)
SI_Camera.location = (6.2, -7.0, 4.5)

cam_constraint = SI_Camera.constraints.new(type="TRACK_TO")
cam_constraint.target = empty
cam_constraint.track_axis = "TRACK_NEGATIVE_Z"
cam_constraint.up_axis = "UP_Y"

bpy.context.scene.camera = SI_Camera

# --------------------------------------------------
# Lighting
# --------------------------------------------------

key_data = bpy.data.lights.new("SI_KeyLightData", type="AREA")
key_data.energy = 2500
key_data.size = 6.0

SI_KeyLight = bpy.data.objects.new("SI_KeyLight", key_data)
bpy.context.collection.objects.link(SI_KeyLight)
SI_KeyLight.location = (4.5, -5.5, 6.5)

key_constraint = SI_KeyLight.constraints.new(type="TRACK_TO")
key_constraint.target = empty
key_constraint.track_axis = "TRACK_NEGATIVE_Z"
key_constraint.up_axis = "UP_Y"

fill_data = bpy.data.lights.new("SI_FillLightData", type="AREA")
fill_data.energy = 900
fill_data.size = 8.0

SI_FillLight = bpy.data.objects.new("SI_FillLight", fill_data)
bpy.context.collection.objects.link(SI_FillLight)
SI_FillLight.location = (-5.5, 3.5, 4.5)

fill_constraint = SI_FillLight.constraints.new(type="TRACK_TO")
fill_constraint.target = empty
fill_constraint.track_axis = "TRACK_NEGATIVE_Z"
fill_constraint.up_axis = "UP_Y"

# --------------------------------------------------
# World background
# --------------------------------------------------

scene = bpy.context.scene

if scene.world is None:
    scene.world = bpy.data.worlds.new("SI_World")

scene.world.use_nodes = True
world_nodes = scene.world.node_tree.nodes
world_links = scene.world.node_tree.links

bg = world_nodes.get("Background")
if bg is not None:
    bg.inputs["Color"].default_value = BG_COLOR
    bg.inputs["Strength"].default_value = 1.0

# --------------------------------------------------
# Render settings
# --------------------------------------------------

try:
    scene.render.engine = "BLENDER_EEVEE_NEXT"
except:
    scene.render.engine = "BLENDER_EEVEE"

scene.render.resolution_x = 1920
scene.render.resolution_y = 1080
scene.render.resolution_percentage = 100

scene.frame_start = 1
scene.frame_end = ANIMATION_END
scene.render.fps = 24

# --------------------------------------------------
# Rotation animation
# --------------------------------------------------

empty.animation_data_clear()

scene.frame_set(1)
empty.rotation_euler = (0, 0, 0)
empty.keyframe_insert(data_path="rotation_euler", frame=1)

scene.frame_set(ANIMATION_END)
empty.rotation_euler = (0, 0, math.radians(360))
empty.keyframe_insert(data_path="rotation_euler", frame=ANIMATION_END)


scene.frame_set(1)

# --------------------------------------------------
# Final selection
# --------------------------------------------------

bpy.ops.object.select_all(action="DESELECT")
empty.select_set(True)
bpy.context.view_layer.objects.active = empty
`;
    let buttonInstructions =
`Create these GeoGebra buttons.

Button label:
Setup

On Click JavaScript:
setupSierpinskiIcosahedron();

Button label:
Build

On Click JavaScript:
buildSierpinskiIcosahedron();

Button label:
Clear

On Click JavaScript:
clearSierpinskiIcosahedron();
`;

    setOutputs(instructions, code, blenderCode, buttonInstructions);
}

function generateGeoGebraEpidemicBranching() {

    let p = document.getElementById("epiP").value;
    let contacts = document.getElementById("epiContacts").value;
    let generations = document.getElementById("epiGenerations").value;
    let lengthFactor = document.getElementById("epiLengthFactor").value;
    let angle = document.getElementById("epiAngle").value;
    let jitter = document.getElementById("epiJitter").value;
    let maxCases = document.getElementById("epiMaxCases").value;

    let instructions =
`Epidemic Branching Process

This GeoGebra model shows a simple epidemic branching process.

Scientific idea:

One infected person has a fixed number of possible contacts.

Each contact becomes infected with probability p.

The number of new infections in each generation is therefore random.

The key threshold is:

R = contacts × transmission probability

If R is below 1, outbreaks usually die out.

If R is above 1, outbreaks may grow.

Suggested workflow:

1. Press Setup controls.
2. Press Build epidemic tree.
3. Change the sliders if desired.
4. Press Build epidemic tree again.
5. Press Run outbreak statistics to estimate extinction probability.
6. Press Clear to remove the display.

Use the GeoGebra Button Setup panel for the required button calls.`;

    let code =
`// GeoGebra Global JavaScript
// Epidemic Branching Process

var EPI = {
    objects: [],
    caseCount: 0,
    generationReached: 0,

    p: ${p},
    contacts: ${contacts},
    generations: ${generations},
    lengthFactor: ${lengthFactor},
    angle: ${angle},
    jitter: ${jitter},
    maxCases: ${maxCases}
};

function setupEpidemicControls() {

    if (!ggbApplet.exists("epiP")) {
        ggbApplet.evalCommand("epiP = " + EPI.p);
        ggbApplet.setLabelVisible("epiP", true);
    }

    if (!ggbApplet.exists("epiContacts")) {
        ggbApplet.evalCommand("epiContacts = " + EPI.contacts);
        ggbApplet.setLabelVisible("epiContacts", true);
    }

    if (!ggbApplet.exists("epiGenerations")) {
        ggbApplet.evalCommand("epiGenerations = " + EPI.generations);
        ggbApplet.setLabelVisible("epiGenerations", true);
    }

    if (!ggbApplet.exists("epiLengthFactor")) {
        ggbApplet.evalCommand("epiLengthFactor = " + EPI.lengthFactor);
        ggbApplet.setLabelVisible("epiLengthFactor", true);
    }

    if (!ggbApplet.exists("epiAngle")) {
        ggbApplet.evalCommand("epiAngle = " + EPI.angle);
        ggbApplet.setLabelVisible("epiAngle", true);
    }

    if (!ggbApplet.exists("epiJitter")) {
        ggbApplet.evalCommand("epiJitter = " + EPI.jitter);
        ggbApplet.setLabelVisible("epiJitter", true);
    }

    if (!ggbApplet.exists("epiMaxCases")) {
        ggbApplet.evalCommand("epiMaxCases = " + EPI.maxCases);
        ggbApplet.setLabelVisible("epiMaxCases", true);
    }

    alert(
        "Epidemic controls created.\\n\\n" +
        "Suggested slider settings:\\n\\n" +
        "epiP: 0 to 1, increment 0.01\\n" +
        "epiContacts: 0 to 8, increment 1\\n" +
        "epiGenerations: 1 to 12, increment 1\\n" +
        "epiLengthFactor: 0.3 to 0.9, increment 0.05\\n" +
        "epiAngle: 5 to 60, increment 1\\n" +
        "epiJitter: 0 to 30, increment 1\\n" +
        "epiMaxCases: 50 to 2000, increment 50"
    );
}

function readEpidemicControls() {

    if (!ggbApplet.exists("epiP")) {
        ggbApplet.evalCommand("epiP = " + EPI.p);
    }

    if (!ggbApplet.exists("epiContacts")) {
        ggbApplet.evalCommand("epiContacts = " + EPI.contacts);
    }

    if (!ggbApplet.exists("epiGenerations")) {
        ggbApplet.evalCommand("epiGenerations = " + EPI.generations);
    }

    if (!ggbApplet.exists("epiLengthFactor")) {
        ggbApplet.evalCommand("epiLengthFactor = " + EPI.lengthFactor);
    }

    if (!ggbApplet.exists("epiAngle")) {
        ggbApplet.evalCommand("epiAngle = " + EPI.angle);
    }

    if (!ggbApplet.exists("epiJitter")) {
        ggbApplet.evalCommand("epiJitter = " + EPI.jitter);
    }

    if (!ggbApplet.exists("epiMaxCases")) {
        ggbApplet.evalCommand("epiMaxCases = " + EPI.maxCases);
    }

    EPI.p = ggbApplet.getValue("epiP");
    EPI.contacts = Math.round(ggbApplet.getValue("epiContacts"));
    EPI.generations = Math.round(ggbApplet.getValue("epiGenerations"));
    EPI.lengthFactor = ggbApplet.getValue("epiLengthFactor");
    EPI.angle = ggbApplet.getValue("epiAngle");
    EPI.jitter = ggbApplet.getValue("epiJitter");
    EPI.maxCases = Math.round(ggbApplet.getValue("epiMaxCases"));

    if (EPI.p < 0) {
        EPI.p = 0;
    }

    if (EPI.p > 1) {
        EPI.p = 1;
    }

    if (EPI.contacts < 0) {
        EPI.contacts = 0;
    }

    if (EPI.contacts > 12) {
        alert("epiContacts is large. Using 12 instead.");
        EPI.contacts = 12;
    }

    if (EPI.generations < 1) {
        EPI.generations = 1;
    }

    if (EPI.generations > 15) {
        alert("epiGenerations is large. Using 15 instead.");
        EPI.generations = 15;
    }

    if (EPI.lengthFactor <= 0) {
        EPI.lengthFactor = ${lengthFactor};
    }

    if (EPI.maxCases < 1) {
        EPI.maxCases = 1;
    }
}

function clearEpidemic() {

    for (var i = ggbApplet.getObjectNumber() - 1; i >= 0; i--) {
        try {
            var obj = ggbApplet.getObjectName(i);

            if (
                obj.indexOf("EPI_B_") === 0 ||
                obj.indexOf("EPI_C_") === 0 ||
                obj.indexOf("EPI_Text") === 0 ||
                obj === "EPI_R" ||
                obj === "EPI_TotalCases" ||
                obj === "EPI_FinalGenerationReached" ||
                obj === "EPI_ExtinctEarly" ||
                obj === "EPI_Trials" ||
                obj === "EPI_ExtinctionRate" ||
                obj === "EPI_OutbreakRate"
            ) {
                ggbApplet.deleteObject(obj);
            }
        } catch(e) {}
    }

    EPI.objects = [];
    EPI.caseCount = 0;
    EPI.generationReached = 0;
}

function epiRandomBetween(a, b) {
    return a + Math.random() * (b - a);
}

function epiDegreesToRadians(deg) {
    return deg * Math.PI / 180;
}

function epiSetNumber(name, value) {

    if (!ggbApplet.exists(name)) {
        ggbApplet.evalCommand(name + " = " + value);
    } else {
        ggbApplet.evalCommand("SetValue(" + name + ", " + value + ")");
    }

    try {
        ggbApplet.setVisible(name, false);
        ggbApplet.setLabelVisible(name, false);
    } catch(e) {}
}

function epiWriteText(name, text, x, y) {

    try {
        if (ggbApplet.exists(name)) {
            ggbApplet.deleteObject(name);
        }

        var safe = String(text).replace(/"/g, "'");
        ggbApplet.evalCommand(name + ' = Text("' + safe + '", (' + x + ',' + y + '))');
        ggbApplet.setLabelVisible(name, false);
        ggbApplet.setColor(name, 40, 40, 40);
    } catch(e) {}
}

function epiDrawCase(x, y, generation) {

    var caseName = "EPI_C_" + EPI.caseCount;

    ggbApplet.evalCommand(caseName + " = (" + x + "," + y + ")");

    try {
        ggbApplet.setLabelVisible(caseName, false);

        if (generation === 0) {
            ggbApplet.setColor(caseName, 220, 40, 40);
            ggbApplet.setPointSize(caseName, 8);
        } else {
            var red = Math.min(255, 120 + generation * 18);
            var green = Math.max(40, 150 - generation * 8);
            var blue = Math.max(40, 120 - generation * 8);

            ggbApplet.setColor(caseName, red, green, blue);
            ggbApplet.setPointSize(caseName, 5);
        }
    } catch(e) {}

    EPI.objects.push(caseName);
    EPI.caseCount++;

    return caseName;
}

function epiDrawTransmission(x1, y1, x2, y2, generation) {

    var branchName = "EPI_B_" + EPI.objects.length;

    ggbApplet.evalCommand(
        branchName + " = Segment((" + x1 + "," + y1 + "),(" + x2 + "," + y2 + "))"
    );

    try {
        ggbApplet.setLabelVisible(branchName, false);

        var red = Math.min(255, 130 + generation * 14);
        var green = Math.max(50, 130 - generation * 8);
        var blue = Math.max(50, 130 - generation * 8);

        ggbApplet.setColor(branchName, red, green, blue);
        ggbApplet.setLineThickness(branchName, Math.max(2, 5 - generation * 0.2));
    } catch(e) {}

    EPI.objects.push(branchName);
}

function growEpidemic(x, y, length, direction, generation) {

    if (generation > EPI.generations) {
        return;
    }

    if (EPI.caseCount >= EPI.maxCases) {
        return;
    }

    if (generation > EPI.generationReached) {
        EPI.generationReached = generation;
    }

    var infectedChildren = [];

    for (var c = 0; c < EPI.contacts; c++) {
        if (Math.random() < EPI.p) {
            infectedChildren.push(c);
        }
    }

    if (infectedChildren.length === 0) {
        return;
    }

    var spread = EPI.angle * Math.max(1, infectedChildren.length - 1);

    for (var i = 0; i < infectedChildren.length; i++) {

        if (EPI.caseCount >= EPI.maxCases) {
            return;
        }

        var offset;

        if (infectedChildren.length === 1) {
            offset = 0;
        } else {
            offset = -spread / 2 + i * spread / (infectedChildren.length - 1);
        }

        var randomError = epiRandomBetween(-EPI.jitter, EPI.jitter);
        var childDirection = direction + epiDegreesToRadians(offset + randomError);

        var x2 = x + length * Math.cos(childDirection);
        var y2 = y + length * Math.sin(childDirection);

        epiDrawTransmission(x, y, x2, y2, generation);
        epiDrawCase(x2, y2, generation);

        growEpidemic(
            x2,
            y2,
            length * EPI.lengthFactor,
            childDirection,
            generation + 1
        );
    }
}

function buildEpidemicTree() {

    readEpidemicControls();
    clearEpidemic();

    epiDrawCase(0, 0, 0);

    growEpidemic(
        0,
        0,
        4,
        Math.PI / 2,
        1
    );

    var R = EPI.contacts * EPI.p;
    var extinctEarly = 0;

    if (EPI.generationReached < EPI.generations) {
        extinctEarly = 1;
    }

    epiSetNumber("EPI_R", Number(R.toFixed(3)));
    epiSetNumber("EPI_TotalCases", EPI.caseCount);
    epiSetNumber("EPI_FinalGenerationReached", EPI.generationReached);
    epiSetNumber("EPI_ExtinctEarly", extinctEarly);

    epiWriteText("EPI_TextTitle", "Epidemic Branching Process", 4.5, 3.0);
    epiWriteText("EPI_TextR", "R = " + R.toFixed(2), 4.5, 2.6);
    epiWriteText("EPI_TextCases", "Total cases = " + EPI.caseCount, 4.5, 2.2);
    epiWriteText("EPI_TextGeneration", "Generation reached = " + EPI.generationReached, 4.5, 1.8);
}

function simulateEpidemicOnce() {

    var population = 1;

    for (var gen = 1; gen <= EPI.generations; gen++) {

        var nextPopulation = 0;

        for (var i = 0; i < population; i++) {
            for (var c = 0; c < EPI.contacts; c++) {
                if (Math.random() < EPI.p) {
                    nextPopulation++;
                }
            }
        }

        population = nextPopulation;

        if (population === 0) {
            return true;
        }

        if (population > EPI.maxCases) {
            return false;
        }
    }

    return false;
}

function runEpidemicStatistics() {

    readEpidemicControls();

    var trials = 200;
    var extinctCount = 0;

    for (var t = 0; t < trials; t++) {
        if (simulateEpidemicOnce()) {
            extinctCount++;
        }
    }

    var extinctionRate = extinctCount / trials;
    var outbreakRate = 1 - extinctionRate;

    var R = EPI.contacts * EPI.p;

    epiSetNumber("EPI_Trials", trials);
    epiSetNumber("EPI_ExtinctionRate", Number(extinctionRate.toFixed(3)));
    epiSetNumber("EPI_OutbreakRate", Number(outbreakRate.toFixed(3)));

    epiWriteText("EPI_TextStatsTitle", "Outbreak statistics", 4.5, 1.2);
    epiWriteText("EPI_TextTrials", "Trials = " + trials, 4.5, 0.8);
    epiWriteText("EPI_TextExtinction", "Extinction rate = " + extinctionRate.toFixed(2), 4.5, 0.4);
    epiWriteText("EPI_TextOutbreak", "Outbreak rate = " + outbreakRate.toFixed(2), 4.5, 0.0);
    epiWriteText("EPI_TextThreshold", "R = " + R.toFixed(2), 4.5, -0.4);
}`;

    let buttonInstructions =
`Create these GeoGebra buttons.

Button label:
Setup controls

On Click JavaScript:
setupEpidemicControls();

Button label:
Build epidemic tree

On Click JavaScript:
buildEpidemicTree();

Button label:
Run outbreak statistics

On Click JavaScript:
runEpidemicStatistics();

Button label:
Clear

On Click JavaScript:
clearEpidemic();
`;

    setOutputs(instructions, code, "", buttonInstructions);
}

function generateGeoGebraGeneticDrift() {

    let instructions =
`Genetic Drift: Frequency Plot

Stage 2 generator.

This GeoGebra model shows one or more random allele-frequency paths over generations.

Biological story:

A population contains two allele types, A and a.

The frequency of allele A is p.

In each generation, the next generation is formed by random sampling from the current generation.

Even without natural selection, mutation, or migration, chance alone can make p drift upward or downward.

Eventually the allele may be lost, where p = 0, or fixed, where p = 1.

Model rule:

Population size: N
Allele copies: 2N
Current allele frequency: p
Next generation count: random sample from 2N allele copies
Next frequency: sampled count / 2N

Stage 2 includes both a single allele-frequency path and multiple sample paths.

Run One Path draws one random drift path.

Run Many Paths draws several faint paths and counts how many are lost, fixed, or still drifting.

Use the GeoGebra Button Setup panel for the required button calls.`;

    let code =
`// GeoGebra Global JavaScript
// Genetic Drift
// Stage 2: one or many allele-frequency sample paths

var GD = {
    objects: [],
    pointCount: 0,
    segmentCount: 0,

    populationSize: 50,
    alleleCopies: 100,
    initialFrequency: 0.5,
    generations: 70,

    manyPathCount: 10,

    smallPopulationSize: 20,
    largePopulationSize: 200,
    comparisonGenerations: 70,
    comparisonPathCount: 8,

    xScale: 0.08,
    yScale: 5.0,
    xOffset: 0.0,
    yOffset: 0.0
};

function fmtGD(x) {
    return Number(x.toFixed(5));
}

function clearGeneticDrift() {

    for (var i = ggbApplet.getObjectNumber() - 1; i >= 0; i--) {
        try {
            var obj = ggbApplet.getObjectName(i);

            if (obj.indexOf("GD") === 0) {
                ggbApplet.deleteObject(obj);
            }
        } catch(e) {}
    }

    GD.objects = [];
    GD.pointCount = 0;
    GD.segmentCount = 0;
}

function gdToPoint(generation, frequency) {

    return {
        x: GD.xOffset + generation * GD.xScale,
        y: GD.yOffset + frequency * GD.yScale
    };
}

function gdToPointCustom(generation, frequency, xOffset, yOffset, xScale, yScale) {

    return {
        x: xOffset + generation * xScale,
        y: yOffset + frequency * yScale
    };
}

function makeGDPoint(p, visiblePoint) {

    var name = "GDP" + GD.pointCount;

    ggbApplet.evalCommand(
        name + " = (" + fmtGD(p.x) + "," + fmtGD(p.y) + ")"
    );

    try {
        ggbApplet.setLabelVisible(name, false);

        if (visiblePoint) {
            ggbApplet.setPointSize(name, 3);
            ggbApplet.setColor(name, 40, 90, 220);
        } else {
            ggbApplet.setVisible(name, false);
        }
    } catch(e) {}

    GD.objects.push(name);
    GD.pointCount++;

    return name;
}

function makeGDSegment(a, b, red, green, blue, thickness) {

    var p1 = makeGDPoint(a, false);
    var p2 = makeGDPoint(b, false);

    var name = "GDSeg" + GD.segmentCount;

    ggbApplet.evalCommand(name + " = Segment(" + p1 + "," + p2 + ")");

    try {
        ggbApplet.setLabelVisible(name, false);
        ggbApplet.setColor(name, red, green, blue);
        ggbApplet.setLineThickness(name, thickness);
    } catch(e) {}

    GD.objects.push(name);
    GD.segmentCount++;

    return name;
}

function binomialSampleGD(trials, probability) {

    var count = 0;

    for (var i = 0; i < trials; i++) {
        if (Math.random() < probability) {
            count++;
        }
    }

    return count;
}

function simulateGeneticDriftPathGD() {

    var p = GD.initialFrequency;
    var points = [];

    points.push(gdToPoint(0, p));

    var status = "drifting";
    var finalGeneration = GD.generations;

    for (var gen = 1; gen <= GD.generations; gen++) {

        var countA = binomialSampleGD(GD.alleleCopies, p);
        p = countA / GD.alleleCopies;

        points.push(gdToPoint(gen, p));

        if (p === 0) {
            status = "allele lost";
            finalGeneration = gen;
            break;
        }

        if (p === 1) {
            status = "allele fixed";
            finalGeneration = gen;
            break;
        }
    }

    return {
        points: points,
        finalFrequency: p,
        finalGeneration: finalGeneration,
        status: status
    };
}

function simulateGeneticDriftPathCustomGD(populationSize, generations, xOffset, yOffset, xScale, yScale) {

    var alleleCopies = 2 * populationSize;
    var p = GD.initialFrequency;
    var points = [];

    points.push(gdToPointCustom(0, p, xOffset, yOffset, xScale, yScale));

    var status = "drifting";
    var finalGeneration = generations;

    for (var gen = 1; gen <= generations; gen++) {

        var countA = binomialSampleGD(alleleCopies, p);
        p = countA / alleleCopies;

        points.push(gdToPointCustom(gen, p, xOffset, yOffset, xScale, yScale));

        if (p === 0) {
            status = "allele lost";
            finalGeneration = gen;
            break;
        }

        if (p === 1) {
            status = "allele fixed";
            finalGeneration = gen;
            break;
        }
    }

    return {
        points: points,
        finalFrequency: p,
        finalGeneration: finalGeneration,
        status: status
    };
}

function drawGDPath(pathResult, red, green, blue, thickness) {

    var pts = pathResult.points;

    for (var i = 1; i < pts.length; i++) {
        makeGDSegment(
            pts[i - 1],
            pts[i],
            red,
            green,
            blue,
            thickness
        );
    }

    var finalPoint = pts[pts.length - 1];
    var finalName = makeGDPoint(finalPoint, true);

    try {
        if (pathResult.status === "allele lost") {
            ggbApplet.setColor(finalName, 180, 40, 40);
            ggbApplet.setPointSize(finalName, 5);
        } else if (pathResult.status === "allele fixed") {
            ggbApplet.setColor(finalName, 40, 150, 70);
            ggbApplet.setPointSize(finalName, 5);
        } else {
            ggbApplet.setColor(finalName, red, green, blue);
            ggbApplet.setPointSize(finalName, 4);
        }
    } catch(e) {}
}

function drawGDAxes() {

    var p0Left = gdToPoint(0, 0);
    var p0Right = gdToPoint(GD.generations, 0);

    var p1Left = gdToPoint(0, 1);
    var p1Right = gdToPoint(GD.generations, 1);

    var yAxisBottom = gdToPoint(0, 0);
    var yAxisTop = gdToPoint(0, 1);

    var xAxisLeft = gdToPoint(0, 0);
    var xAxisRight = gdToPoint(GD.generations, 0);

    makeGDSegment(p0Left, p0Right, 180, 80, 80, 3);
    makeGDSegment(p1Left, p1Right, 80, 150, 80, 3);
    makeGDSegment(yAxisBottom, yAxisTop, 80, 80, 80, 2);
    makeGDSegment(xAxisLeft, xAxisRight, 80, 80, 80, 2);

    gdWriteText("GDTextLost", "Lost: p = 0", 8.3, -0.25);
    gdWriteText("GDTextFixed", "Fixed: p = 1", 8.3, 4.85);
    gdWriteText("GDTextYAxis", "Allele frequency", -0.4, 5.25);
    gdWriteText("GDTextXAxis", "Generation", 3.5, -0.75);
}

function drawGDComparisonAxes(suffix, title, populationSize, xOffset, yOffset, xScale, yScale, generations) {

    var p0Left = gdToPointCustom(0, 0, xOffset, yOffset, xScale, yScale);
    var p0Right = gdToPointCustom(generations, 0, xOffset, yOffset, xScale, yScale);

    var p1Left = gdToPointCustom(0, 1, xOffset, yOffset, xScale, yScale);
    var p1Right = gdToPointCustom(generations, 1, xOffset, yOffset, xScale, yScale);

    var yAxisBottom = gdToPointCustom(0, 0, xOffset, yOffset, xScale, yScale);
    var yAxisTop = gdToPointCustom(0, 1, xOffset, yOffset, xScale, yScale);

    makeGDSegment(p0Left, p0Right, 180, 80, 80, 2);
    makeGDSegment(p1Left, p1Right, 80, 150, 80, 2);
    makeGDSegment(yAxisBottom, yAxisTop, 80, 80, 80, 2);

    gdWriteText("GDTextTitle" + suffix, title, xOffset, yOffset + yScale + 0.45);
    gdWriteText("GDTextN" + suffix, "N = " + populationSize, xOffset, yOffset + yScale + 0.1);
}

function setupGeneticDrift() {

    clearGeneticDrift();

    GD.alleleCopies = 2 * GD.populationSize;

    drawGDAxes();

    gdWriteText("GDTextTitle", "Genetic Drift", 8.7, 4.3);
    gdWriteText("GDTextSetup", "Press Run One Path", 8.7, 3.9);
    gdWriteText("GDTextRule", "Random sampling changes allele frequency", 8.7, 3.5);

    alert(
        "Genetic Drift setup complete.\\n\\n" +
        "Use Run One Path to draw a random allele-frequency path.\\n\\n" +
        "The lower red line means allele lost.\\n" +
        "The upper green line means allele fixed."
    );
}

function runGeneticDriftPath() {

    clearGeneticDrift();

    GD.alleleCopies = 2 * GD.populationSize;

    drawGDAxes();

    var result = simulateGeneticDriftPathGD();

    drawGDPath(result, 40, 90, 220, 3);

    updateGDText(
        result.finalFrequency,
        result.finalGeneration,
        result.status
    );
}

function runGeneticDriftPaths() {

    clearGeneticDrift();

    GD.alleleCopies = 2 * GD.populationSize;

    drawGDAxes();

    var lostCount = 0;
    var fixedCount = 0;
    var driftingCount = 0;

    for (var i = 0; i < GD.manyPathCount; i++) {

        var result = simulateGeneticDriftPathGD();

        if (result.status === "allele lost") {
            lostCount++;
            drawGDPath(result, 190, 90, 90, 1);
        } else if (result.status === "allele fixed") {
            fixedCount++;
            drawGDPath(result, 80, 150, 90, 1);
        } else {
            driftingCount++;
            drawGDPath(result, 90, 130, 220, 1);
        }
    }

    updateGDManyText(lostCount, fixedCount, driftingCount);
}

function runGeneticDriftComparison() {

    clearGeneticDrift();

    var generations = GD.comparisonGenerations;
    var pathCount = GD.comparisonPathCount;

    var smallN = GD.smallPopulationSize;
    var largeN = GD.largePopulationSize;

    var xScale = 0.055;
    var yScale = 4.0;

    var leftX = 0.0;
    var rightX = 5.2;
    var baseY = 0.0;

    drawGDComparisonAxes(
    "Small",
    "Small population",
    smallN,
    leftX,
    baseY,
    xScale,
    yScale,
    generations
);

drawGDComparisonAxes(
    "Large",
    "Large population",
    largeN,
    rightX,
    baseY,
    xScale,
    yScale,
    generations
);

    var smallLost = 0;
    var smallFixed = 0;
    var smallDrifting = 0;

    var largeLost = 0;
    var largeFixed = 0;
    var largeDrifting = 0;

    for (var i = 0; i < pathCount; i++) {

        var smallResult = simulateGeneticDriftPathCustomGD(
            smallN,
            generations,
            leftX,
            baseY,
            xScale,
            yScale
        );

        if (smallResult.status === "allele lost") {
            smallLost++;
            drawGDPath(smallResult, 190, 90, 90, 1);
        } else if (smallResult.status === "allele fixed") {
            smallFixed++;
            drawGDPath(smallResult, 80, 150, 90, 1);
        } else {
            smallDrifting++;
            drawGDPath(smallResult, 90, 130, 220, 1);
        }

        var largeResult = simulateGeneticDriftPathCustomGD(
            largeN,
            generations,
            rightX,
            baseY,
            xScale,
            yScale
        );

        if (largeResult.status === "allele lost") {
            largeLost++;
            drawGDPath(largeResult, 190, 90, 90, 1);
        } else if (largeResult.status === "allele fixed") {
            largeFixed++;
            drawGDPath(largeResult, 80, 150, 90, 1);
        } else {
            largeDrifting++;
            drawGDPath(largeResult, 90, 130, 220, 1);
        }
    }

    updateGDComparisonText(
        smallN,
        largeN,
        pathCount,
        smallLost,
        smallFixed,
        smallDrifting,
        largeLost,
        largeFixed,
        largeDrifting
    );
}

function gdWriteText(name, text, x, y) {

    try {
        if (ggbApplet.exists(name)) {
            ggbApplet.deleteObject(name);
        }

        var safe = String(text).replace(/"/g, "'");

        ggbApplet.evalCommand(name + ' = Text("' + safe + '", (' + x + ',' + y + '))');

        ggbApplet.setLabelVisible(name, false);
        ggbApplet.setColor(name, 40, 40, 40);
        ggbApplet.setVisible(name, true);

    } catch(e) {}
}

function updateGDText(finalFrequency, finalGeneration, status) {

    gdWriteText("GDTextTitle", "Genetic Drift", 8.7, 4.3);
    gdWriteText("GDTextPopulation", "Population size N: " + GD.populationSize, 8.7, 3.9);
    gdWriteText("GDTextCopies", "Allele copies: " + GD.alleleCopies, 8.7, 3.5);
    gdWriteText("GDTextInitial", "Initial frequency: " + GD.initialFrequency, 8.7, 3.1);
    gdWriteText("GDTextFinal", "Final frequency: " + fmtGD(finalFrequency), 8.7, 2.7);
    gdWriteText("GDTextGeneration", "Generation reached: " + finalGeneration, 8.7, 2.3);
    gdWriteText("GDTextStatus", "Status: " + status, 8.7, 1.9);
}

function updateGDManyText(lostCount, fixedCount, driftingCount) {

    gdWriteText("GDTextTitle", "Genetic Drift", 8.7, 4.3);
    gdWriteText("GDTextPopulation", "Population size N: " + GD.populationSize, 8.7, 3.9);
    gdWriteText("GDTextCopies", "Allele copies: " + GD.alleleCopies, 8.7, 3.5);
    gdWriteText("GDTextInitial", "Initial frequency: " + GD.initialFrequency, 8.7, 3.1);
    gdWriteText("GDTextPaths", "Sample paths: " + GD.manyPathCount, 8.7, 2.7);
    gdWriteText("GDTextLostCount", "Lost: " + lostCount, 8.7, 2.3);
    gdWriteText("GDTextFixedCount", "Fixed: " + fixedCount, 8.7, 1.9);
    gdWriteText("GDTextStillDrifting", "Still drifting: " + driftingCount, 8.7, 1.5);
}

function updateGDComparisonText(
    smallN,
    largeN,
    pathCount,
    smallLost,
    smallFixed,
    smallDrifting,
    largeLost,
    largeFixed,
    largeDrifting
) {

    gdWriteText("GDTextMainTitle", "Genetic Drift Comparison", 10.2, 4.3);
    gdWriteText("GDTextMainIdea", "Smaller populations drift faster", 10.2, 3.9);
    gdWriteText("GDTextPaths", "Paths per panel: " + pathCount, 10.2, 3.5);
    gdWriteText("GDTextInitial", "Initial frequency: " + GD.initialFrequency, 10.2, 3.1);

    gdWriteText("GDTextSmallTitle", "Small N = " + smallN, 10.2, 2.5);
    gdWriteText("GDTextSmallLost", "Lost: " + smallLost, 10.2, 2.1);
    gdWriteText("GDTextSmallFixed", "Fixed: " + smallFixed, 10.2, 1.7);
    gdWriteText("GDTextSmallDrifting", "Still drifting: " + smallDrifting, 10.2, 1.3);

    gdWriteText("GDTextLargeTitle", "Large N = " + largeN, 10.2, 0.7);
    gdWriteText("GDTextLargeLost", "Lost: " + largeLost, 10.2, 0.3);
    gdWriteText("GDTextLargeFixed", "Fixed: " + largeFixed, 10.2, -0.1);
    gdWriteText("GDTextLargeDrifting", "Still drifting: " + largeDrifting, 10.2, -0.5);
}`;

    const buttonInstructions =
`Create these GeoGebra buttons.

Button label:
Initialise

On Click JavaScript:
initialiseGeneticDrift();

Button label:
Step one generation

On Click JavaScript:
stepGeneticDrift();

Button label:
Run 10 generations

On Click JavaScript:
runGeneticDriftGenerations(10);

Button label:
Run until fixation

On Click JavaScript:
runGeneticDriftUntilFixation();

Button label:
Clear

On Click JavaScript:
clearGeneticDrift();
`;

    setOutputs(instructions, code, "", buttonInstructions);
}

function generateGeoGebraGeneticDriftBranching() {

    let instructions =
`Genetic Drift: Branching Lineage

This first real version draws one branching-lineage tree.

Biological story:

Instead of tracking allele frequency in the whole population,
we follow the descendants of one allele copy.

At each generation, each copy leaves:

0 descendants with probability p0
1 descendant  with probability p1
2 descendants with probability p2

Default visual case:

p0 = 0.15
p1 = 0.45
p2 = 0.40

Mean offspring = p1 + 2 p2 = 1.25

This is slightly supercritical, so the tree is more visible. The neutral critical case would have mean offspring equal to 1.

So the lineage is neutral "on average", but chance alone can still
make it die out early or survive to the final generation.

Create four GeoGebra buttons with JavaScript:

setupGeneticDriftBranching();

runGeneticDriftBranching();

runGeneticDriftBranchingStats();

clearGeneticDriftBranching();

Suggested button labels:

Setup Branching Lineage
Run Branching Lineage
Run Branching Statistics
Clear Branching Lineage

Useful linked GeoGebra values for text boxes:

GDBTotalBranches
GDBFinalPopulation
GDBMeanOffspring
GDBReachedFinalGeneration
GDBReachedFinalText`;

    let commands =
`// Genetic Drift: Branching Lineage
// No GeoGebra Input Commands are required.
// Paste the Global JavaScript into GeoGebra Global JavaScript.`;

    let code =
`// GeoGebra Global JavaScript
// Genetic Drift: Branching Lineage
// Stage 1 real version: one slightly supercritical branching-lineage tree

var GDB = {
    objects: [],
    branchCount: 0,
    finalPopulation: 0,
    reachedFinalGeneration: 0,

    p0: 0.15,
    p1: 0.45,
    p2: 0.40,

    generations: 9,
    lengthFactor: 0.72,
    angle: 26,
    jitter: 7,
    maxBranches: 800,

    statsTrials: 200
};

function gdbRandomBetween(a, b) {
    return a + Math.random() * (b - a);
}

function gdbDegreesToRadians(deg) {
    return deg * Math.PI / 180;
}

function gdbSetNumber(name, value) {
    if (!ggbApplet.exists(name)) {
        ggbApplet.evalCommand(name + " = " + value);
    } else {
        ggbApplet.evalCommand("SetValue(" + name + ", " + value + ")");
    }

    try {
        ggbApplet.setLabelVisible(name, false);
        ggbApplet.setVisible(name, false);
    } catch(e) {}
}

function gdbSetTextValue(name, text) {
    try {
        if (ggbApplet.exists(name)) {
            ggbApplet.deleteObject(name);
        }

        var safe = String(text).replace(/"/g, "'");
        ggbApplet.evalCommand(name + ' = "' + safe + '"');
        ggbApplet.setLabelVisible(name, false);
        ggbApplet.setVisible(name, false);
    } catch(e) {}
}

function gdbWriteText(name, text, x, y) {

    try {
        if (ggbApplet.exists(name)) {
            ggbApplet.deleteObject(name);
        }

        var safe = String(text).replace(/"/g, "'");

        ggbApplet.evalCommand(
            name + ' = Text("' + safe + '", (' + x + ',' + y + '))'
        );

        ggbApplet.setLabelVisible(name, false);
        ggbApplet.setColor(name, 40, 40, 40);
        ggbApplet.setVisible(name, true);

    } catch(e) {}
}

function clearGeneticDriftBranching() {

    for (var i = ggbApplet.getObjectNumber() - 1; i >= 0; i--) {
        try {
            var obj = ggbApplet.getObjectName(i);

            if (obj.indexOf("GDB") === 0) {
                ggbApplet.deleteObject(obj);
            }
        } catch(e) {}
    }

    GDB.objects = [];
    GDB.branchCount = 0;
    GDB.finalPopulation = 0;
    GDB.reachedFinalGeneration = 0;
}

function sampleGDBOffspring() {

    var u = Math.random();

    if (u < GDB.p0) {
        return 0;
    }

    if (u < GDB.p0 + GDB.p1) {
        return 1;
    }

    return 2;
}

function simulateGDBOneLineage() {

    var population = 1;
    var maxPopulation = 1;
    var reachedFinal = 0;

    for (var gen = 0; gen < GDB.generations; gen++) {

        var nextPopulation = 0;

        for (var i = 0; i < population; i++) {

            var children = sampleGDBOffspring();

            nextPopulation += children;
        }

        population = nextPopulation;

        if (population > maxPopulation) {
            maxPopulation = population;
        }

        if (population === 0) {
            return {
                finalPopulation: 0,
                maxPopulation: maxPopulation,
                reachedFinalGeneration: 0,
                extinctEarly: 1
            };
        }
    }

    if (population > 0) {
        reachedFinal = 1;
    }

    return {
        finalPopulation: population,
        maxPopulation: maxPopulation,
        reachedFinalGeneration: reachedFinal,
        extinctEarly: reachedFinal === 1 ? 0 : 1
    };
}

function drawGDBBranch(x1, y1, x2, y2, generation) {

    if (GDB.branchCount >= GDB.maxBranches) {
        return;
    }

    var name = "GDB_B_" + GDB.branchCount;

    ggbApplet.evalCommand(
        name + " = Segment((" +
        x1 + "," + y1 + "),(" +
        x2 + "," + y2 + "))"
    );

    try {
        ggbApplet.setLabelVisible(name, false);

        var red = Math.min(255, 50 + generation * 24);
        var green = Math.max(60, 170 - generation * 10);
        var blue = Math.max(90, 220 - generation * 8);

        ggbApplet.setColor(name, red, green, blue);
        ggbApplet.setLineThickness(name, Math.max(2, 6 - generation * 0.3));
    } catch(e) {}

    GDB.objects.push(name);
    GDB.branchCount++;
}

function growGDB(x, y, length, angle, generation) {

    if (GDB.branchCount >= GDB.maxBranches) {
        return;
    }

    if (generation >= GDB.generations) {
        GDB.finalPopulation++;
        GDB.reachedFinalGeneration = 1;
        return;
    }

    var children = sampleGDBOffspring();

    if (children === 0) {
        return;
    }

    if (children === 1) {

        var childAngle =
            angle +
            gdbDegreesToRadians(
                gdbRandomBetween(-GDB.jitter, GDB.jitter)
            );

        var x2 = x + length * Math.cos(childAngle);
        var y2 = y + length * Math.sin(childAngle);

        drawGDBBranch(x, y, x2, y2, generation + 1);

        growGDB(
            x2,
            y2,
            length * GDB.lengthFactor,
            childAngle,
            generation + 1
        );

    } else {

        var offsets = [GDB.angle, -GDB.angle];

        for (var i = 0; i < 2; i++) {

            var childAngle =
                angle +
                gdbDegreesToRadians(offsets[i]) +
                gdbDegreesToRadians(
                    gdbRandomBetween(-GDB.jitter, GDB.jitter)
                );

            var x2 = x + length * Math.cos(childAngle);
            var y2 = y + length * Math.sin(childAngle);

            drawGDBBranch(x, y, x2, y2, generation + 1);

            growGDB(
                x2,
                y2,
                length * GDB.lengthFactor,
                childAngle,
                generation + 1
            );
        }
    }
}

function updateGDBText() {

    var meanOffspring = GDB.p1 + 2 * GDB.p2;

    var status;

    if (GDB.reachedFinalGeneration === 1) {
        status = "reached final generation";
    } else {
        status = "extinct early";
    }

    // var x = 6.2;
    // var y = 6.8;
    var x = -4.0;
    var y = 22.0;
    var dy = 0.8;

    gdbWriteText("GDBTextTitle", "Genetic Drift", x, y);
    gdbWriteText("GDBTextSubtitle", "Branching Lineage", x, y - dy);
    gdbWriteText("GDBTextModel", "Lineage-level model", x, y - 2 * dy);

    gdbWriteText("GDBTextMean", "Mean descendants: " + Number(meanOffspring.toFixed(2)), x, y - 3.2 * dy);

    gdbWriteText("GDBTextP0", "p0 no descendants " + GDB.p0, x, y - 4.2 * dy);
    gdbWriteText("GDBTextP1", "p1 one descendant " + GDB.p1, x, y - 5.2 * dy);
    gdbWriteText("GDBTextP2", "p2 two descendants " + GDB.p2, x, y - 6.2 * dy);

    gdbWriteText("GDBTextBranches", "Total branches: " + GDB.branchCount, x, y - 7.5 * dy);
    gdbWriteText("GDBTextFinal", "Final copies: " + GDB.finalPopulation, x, y - 8.5 * dy);
    gdbWriteText("GDBTextStatus", "Status: " + status, x, y - 9.5 * dy);

    gdbWriteText("GDBTextIdea", "Chance shapes one allele lineage", x, y - 10.8 * dy);
}

function drawGDBFrequencyPlot() {

    for (var i = ggbApplet.getObjectNumber() - 1; i >= 0; i--) {
        var obj = ggbApplet.getObjectName(i);

        if (obj.indexOf("GDBFreq") === 0) {
            try {
                ggbApplet.deleteObject(obj);
            } catch (e) {}
        }
    }

    if (gdbFrequencyHistory.length === 0) {
        return;
    }

    var x0 = 0;
    var y0 = -gdbRowSeparation - 7.5;
    var plotWidth = Math.max(8, (gdbPopulationSize - 1) * gdbSpacing);
    var plotHeight = 2.5;

    ggbApplet.evalCommand(
        "GDBFreqAxisX = Segment((" +
        x0.toFixed(4) + "," + y0.toFixed(4) + "),(" +
        (x0 + plotWidth).toFixed(4) + "," + y0.toFixed(4) + "))"
    );

    ggbApplet.evalCommand(
        "GDBFreqAxisY = Segment((" +
        x0.toFixed(4) + "," + y0.toFixed(4) + "),(" +
        x0.toFixed(4) + "," + (y0 + plotHeight).toFixed(4) + "))"
    );

    ggbApplet.evalCommand(
        "GDBFreqTop = Segment((" +
        x0.toFixed(4) + "," + (y0 + plotHeight).toFixed(4) + "),(" +
        (x0 + plotWidth).toFixed(4) + "," + (y0 + plotHeight).toFixed(4) + "))"
    );

    ggbApplet.evalCommand(
        "GDBFreqMid = Segment((" +
        x0.toFixed(4) + "," + (y0 + plotHeight * 0.5).toFixed(4) + "),(" +
        (x0 + plotWidth).toFixed(4) + "," + (y0 + plotHeight * 0.5).toFixed(4) + "))"
    );

    try {
        ggbApplet.setColor("GDBFreqAxisX", 80, 80, 80);
        ggbApplet.setColor("GDBFreqAxisY", 80, 80, 80);
        ggbApplet.setColor("GDBFreqTop", 190, 190, 190);
        ggbApplet.setColor("GDBFreqMid", 210, 210, 210);

        ggbApplet.setLineThickness("GDBFreqAxisX", 2);
        ggbApplet.setLineThickness("GDBFreqAxisY", 2);
        ggbApplet.setLineThickness("GDBFreqTop", 1);
        ggbApplet.setLineThickness("GDBFreqMid", 1);

        hideGDBLabel("GDBFreqAxisX");
        hideGDBLabel("GDBFreqAxisY");
        hideGDBLabel("GDBFreqTop");
        hideGDBLabel("GDBFreqMid");
    } catch (e) {}

    ggbApplet.evalCommand(
        'GDBFreqTitle = Text("Red frequency history", (' +
        x0.toFixed(4) + "," + (y0 + plotHeight + 0.45).toFixed(4) + '))'
    );

    ggbApplet.evalCommand(
        'GDBFreqZero = Text("0", (' +
        (x0 - 0.45).toFixed(4) + "," + (y0 - 0.1).toFixed(4) + '))'
    );

    ggbApplet.evalCommand(
        'GDBFreqHalf = Text("0.5", (' +
        (x0 - 0.75).toFixed(4) + "," + (y0 + plotHeight * 0.5 - 0.1).toFixed(4) + '))'
    );

    ggbApplet.evalCommand(
        'GDBFreqOne = Text("1", (' +
        (x0 - 0.45).toFixed(4) + "," + (y0 + plotHeight - 0.1).toFixed(4) + '))'
    );

    try {
        hideGDBLabel("GDBFreqTitle");
        hideGDBLabel("GDBFreqZero");
        hideGDBLabel("GDBFreqHalf");
        hideGDBLabel("GDBFreqOne");

        ggbApplet.setColor("GDBFreqTitle", 80, 80, 80);
        ggbApplet.setColor("GDBFreqZero", 80, 80, 80);
        ggbApplet.setColor("GDBFreqHalf", 80, 80, 80);
        ggbApplet.setColor("GDBFreqOne", 80, 80, 80);
    } catch (e) {}

    if (gdbFrequencyHistory.length === 1) {
        var px = x0;
        var py = y0 + gdbFrequencyHistory[0] * plotHeight;

        ggbApplet.evalCommand(
            "GDBFreqPoint0 = (" +
            px.toFixed(4) + "," +
            py.toFixed(4) + ")"
        );

        try {
            ggbApplet.setColor("GDBFreqPoint0", 220, 40, 40);
            ggbApplet.setPointSize("GDBFreqPoint0", 5);
            hideGDBLabel("GDBFreqPoint0");
        } catch (e) {}

        return;
    }

    for (var j = 0; j < gdbFrequencyHistory.length - 1; j++) {

        var x1 = x0 + plotWidth * j / Math.max(1, gdbFrequencyHistory.length - 1);
        var y1 = y0 + gdbFrequencyHistory[j] * plotHeight;

        var x2 = x0 + plotWidth * (j + 1) / Math.max(1, gdbFrequencyHistory.length - 1);
        var y2 = y0 + gdbFrequencyHistory[j + 1] * plotHeight;

        var segName = "GDBFreqSeg" + j;

        ggbApplet.evalCommand(
            segName + " = Segment((" +
            x1.toFixed(4) + "," +
            y1.toFixed(4) + "),(" +
            x2.toFixed(4) + "," +
            y2.toFixed(4) + "))"
        );

        try {
            ggbApplet.setColor(segName, 220, 40, 40);
            ggbApplet.setLineThickness(segName, 3);
            hideGDBLabel(segName);
        } catch (e) {}
    }

    var lastIndex = gdbFrequencyHistory.length - 1;
    var lastX = x0 + plotWidth;
    var lastY = y0 + gdbFrequencyHistory[lastIndex] * plotHeight;

    ggbApplet.evalCommand(
        "GDBFreqPointLast = (" +
        lastX.toFixed(4) + "," +
        lastY.toFixed(4) + ")"
    );

    try {
        ggbApplet.setColor("GDBFreqPointLast", 220, 40, 40);
        ggbApplet.setPointSize("GDBFreqPointLast", 5);
        hideGDBLabel("GDBFreqPointLast");
    } catch (e) {}
}

function updateGDBStatsText(
    trials,
    meanOffspring,
    extinctCount,
    survivalCount,
    reachedFinalCount,
    extinctionRate,
    survivalRate,
    reachedFinalRate,
    meanFinalPopulation,
    meanMaxPopulation,
    maxObservedPopulation
) {

    var x = 1.0;
    var y = 7.0;
    var dy = 0.55;

    gdbWriteText("GDBTextTitle", "Genetic Drift", x, y);
    gdbWriteText("GDBTextSubtitle", "Branching Lineage Statistics", x, y - dy);
    gdbWriteText("GDBTextModel", "Many simulated allele lineages", x, y - 2 * dy);

    gdbWriteText("GDBTextTrials", "Trials: " + trials, x, y - 3.2 * dy);
    gdbWriteText("GDBTextMean", "Mean descendants: " + Number(meanOffspring.toFixed(2)), x, y - 4.2 * dy);

    gdbWriteText("GDBTextExtinct", "Extinct early: " + extinctCount, x, y - 5.5 * dy);
    gdbWriteText("GDBTextSurvived", "Survived: " + survivalCount, x, y - 6.5 * dy);
    gdbWriteText("GDBTextReached", "Reached final gen: " + reachedFinalCount, x, y - 7.5 * dy);

    gdbWriteText("GDBTextExtRate", "Extinction rate: " + Number(extinctionRate.toFixed(3)), x, y - 8.8 * dy);
    gdbWriteText("GDBTextSurvRate", "Survival rate: " + Number(survivalRate.toFixed(3)), x, y - 9.8 * dy);
    gdbWriteText("GDBTextReachRate", "Reached final rate: " + Number(reachedFinalRate.toFixed(3)), x, y - 10.8 * dy);

    gdbWriteText("GDBTextMeanFinal", "Mean final copies: " + Number(meanFinalPopulation.toFixed(2)), x, y - 12.1 * dy);
    gdbWriteText("GDBTextMeanMax", "Mean max copies: " + Number(meanMaxPopulation.toFixed(2)), x, y - 13.1 * dy);
    gdbWriteText("GDBTextMaxObserved", "Max observed copies: " + maxObservedPopulation, x, y - 14.1 * dy);

    gdbWriteText("GDBTextIdea", "One tree is a sample; statistics show the pattern", x, y - 15.4 * dy);
}

function setupGeneticDriftBranching() {

    clearGeneticDriftBranching();

    var x = 6.2;
    var y = 6.2;
    var dy = 0.6;

    gdbWriteText("GDBTextTitle", "Genetic Drift", x, y);
    gdbWriteText("GDBTextSubtitle", "Branching Lineage", x, y - dy);
    gdbWriteText("GDBTextSetup", "Run one tree or run statistics", x, y - 2 * dy);
    gdbWriteText("GDBTextModel", "Each copy leaves 0, 1, or 2 descendants", x, y - 3 * dy);
    gdbWriteText("GDBTextMean", "Default mean descendants: 1.25", x, y - 4 * dy);

    alert(
        "Genetic Drift: Branching Lineage setup complete.\\n\\n" +
        "Use Run Branching Lineage to draw one random lineage tree.\\n" +
        "Use Run Branching Statistics to simulate many lineages.\\n\\n" +
        "Default probabilities:\\n" +
        "p0 = 0.15\\n" +
        "p1 = 0.45\\n" +
        "p2 = 0.40\\n\\n" +
        "Mean offspring = 1.25"
    );
}

function runGeneticDriftBranching() {

    clearGeneticDriftBranching();

    var startX = 0;
    var startY = 0;
    var startLength = 4;
    var startAngle = Math.PI / 2;

    growGDB(
        startX,
        startY,
        startLength,
        startAngle,
        0
    );

    var meanOffspring = GDB.p1 + 2 * GDB.p2;
    var survived = GDB.finalPopulation > 0 ? 1 : 0;
    var extinctEarly = survived ? 0 : 1;

    gdbSetNumber("GDBTotalBranches", GDB.branchCount);
    gdbSetNumber("GDBFinalPopulation", GDB.finalPopulation);
    gdbSetNumber("GDBMeanOffspring", meanOffspring);
    gdbSetNumber("GDBReachedFinalGeneration", GDB.reachedFinalGeneration);
    gdbSetNumber("GDBSurvived", survived);
    gdbSetNumber("GDBExtinctEarly", extinctEarly);

    if (GDB.reachedFinalGeneration === 1) {
        gdbSetTextValue("GDBReachedFinalText", "yes");
    } else {
        gdbSetTextValue("GDBReachedFinalText", "no");
    }
    updateGDBText();
}
    
function runGeneticDriftBranchingStats() {

    clearGeneticDriftBranching();

    var trials = GDB.statsTrials;

    var extinctCount = 0;
    var reachedFinalCount = 0;
    var totalFinalPopulation = 0;
    var totalMaxPopulation = 0;
    var maxObservedPopulation = 0;

    for (var t = 0; t < trials; t++) {

        var result = simulateGDBOneLineage();

        if (result.extinctEarly === 1) {
            extinctCount++;
        }

        if (result.reachedFinalGeneration === 1) {
            reachedFinalCount++;
        }

        totalFinalPopulation += result.finalPopulation;
        totalMaxPopulation += result.maxPopulation;

        if (result.maxPopulation > maxObservedPopulation) {
            maxObservedPopulation = result.maxPopulation;
        }
    }

    var survivalCount = trials - extinctCount;
    var extinctionRate = extinctCount / trials;
    var survivalRate = survivalCount / trials;
    var reachedFinalRate = reachedFinalCount / trials;
    var meanFinalPopulation = totalFinalPopulation / trials;
    var meanMaxPopulation = totalMaxPopulation / trials;
    var meanOffspring = GDB.p1 + 2 * GDB.p2;

    gdbSetNumber("GDBStatsTrials", trials);
    gdbSetNumber("GDBStatsExtinctCount", extinctCount);
    gdbSetNumber("GDBStatsSurvivalCount", survivalCount);
    gdbSetNumber("GDBStatsReachedFinalCount", reachedFinalCount);
    gdbSetNumber("GDBStatsExtinctionRate", extinctionRate);
    gdbSetNumber("GDBStatsSurvivalRate", survivalRate);
    gdbSetNumber("GDBStatsReachedFinalRate", reachedFinalRate);
    gdbSetNumber("GDBStatsMeanFinalPopulation", meanFinalPopulation);
    gdbSetNumber("GDBStatsMeanMaxPopulation", meanMaxPopulation);
    gdbSetNumber("GDBStatsMaxObservedPopulation", maxObservedPopulation);

    updateGDBStatsText(
        trials,
        meanOffspring,
        extinctCount,
        survivalCount,
        reachedFinalCount,
        extinctionRate,
        survivalRate,
        reachedFinalRate,
        meanFinalPopulation,
        meanMaxPopulation,
        maxObservedPopulation
    );
}`;

const buttonInstructions =
`Create these GeoGebra buttons.

Button label:
Generate allele branching tree

On Click JavaScript:
generateGeneticDriftBranching();

Button label:
Clear

On Click JavaScript:
clearGeneticDriftBranching();
`;

    setOutputs(commands, code, "", buttonInstructions);
}

function generateGeoGebraGeneticDriftGrid() {

    const gridSize = Number(document.getElementById("gdGridSize").value);
    const initialRedFrequency = Number(document.getElementById("gdInitialRedFrequency").value);
    const circleRadius = Number(document.getElementById("gdCircleRadius").value);
    const spacing = Number(document.getElementById("gdSpacing").value);

    let commands =
`// No GeoGebra Input Commands are required.
// This Genetic Drift Grid is built by Global JavaScript.`;

    let code =
`// --------------------------------------------------
// Genetic Drift: Grid Population
// Side-by-side current and sampled next generation
// --------------------------------------------------

var gdGridSize = ${gridSize};
var gdInitialRedFrequency = ${initialRedFrequency};
var gdCircleRadius = ${circleRadius};
var gdSpacing = ${spacing};

var gdGeneration = 0;
var gdPopulation = [];
var gdNextPopulation = [];
var gdFrequencyHistory = [];
var gdSamplingIndex = 0;

var gdNextGridX = gdGridSize * gdSpacing + 4.0;

function clearGeneticDriftGrid() {
    clearGDFrequencyPlot();
    gdFrequencyHistory = [];

    for (var i = ggbApplet.getObjectNumber() - 1; i >= 0; i--) {
        var obj = ggbApplet.getObjectName(i);

        if (obj.indexOf("GD") === 0) {
            try {
                ggbApplet.deleteObject(obj);
            } catch (e) {}
        }
    }
}

function startNextGenerationSampling() {
    var total = gdGridSize * gdGridSize;

    if (gdPopulation.length === 0) {
        initialiseGeneticDriftGrid();
    }

    gdNextPopulation = [];
    gdSamplingIndex = 0;

    for (var i = 0; i < total; i++) {
        gdNextPopulation.push(-1);   // -1 means blank
    }

    drawGrid("GDNextCell", gdNextPopulation, gdNextGridX);
    updateGDText();
}

function sampleOneMarble() {
    var total = gdGridSize * gdGridSize;

    if (gdPopulation.length === 0) {
        initialiseGeneticDriftGrid();
    }

    if (gdNextPopulation.length === 0) {
        startNextGenerationSampling();
    }

    if (gdSamplingIndex >= total) {
        return;
    }

    var parentIndex = Math.floor(Math.random() * total);
    var sampledAllele = gdPopulation[parentIndex];

    gdNextPopulation[gdSamplingIndex] = sampledAllele;

    var cellName = "GDNextCell" + gdSamplingIndex;
    setGDCellColour(cellName, sampledAllele);

    gdSamplingIndex++;

    updateGDText();
}

function sampleTenMarbles() {
    for (var i = 0; i < 10; i++) {
        sampleOneMarble();
    }
}

function hideGDLabel(name) {
    try {
        ggbApplet.setLabelVisible(name, false);
    } catch (e) {}
}

function setGDCellColour(name, allele) {
    try {
        if (allele === 1) {
            ggbApplet.setColor(name, 220, 40, 40);   // red
            ggbApplet.setFilling(name, 0.9);
        } else if (allele === 0) {
            ggbApplet.setColor(name, 40, 80, 220);   // blue
            ggbApplet.setFilling(name, 0.9);
        } else {
            ggbApplet.setColor(name, 180, 180, 180); // blank grey
            ggbApplet.setFilling(name, 0.15);
        }
    } catch (e) {}
}

function countRedAlleles(population) {
    var redCount = 0;

    for (var i = 0; i < population.length; i++) {
        if (population[i] === 1) {
            redCount++;
        }
    }

    return redCount;
}

function getGDFixationMessage() {
    var total = gdGridSize * gdGridSize;
    var redCount = countRedAlleles(gdPopulation);

    if (redCount === 0) {
        return "Red allele lost at generation " + gdGeneration;
    }

    if (redCount === total) {
        return "Red allele fixed at generation " + gdGeneration;
    }

    return "";
}

function drawGrid(prefix, population, xOffset) {
    var index = 0;

    for (var row = 0; row < gdGridSize; row++) {
        for (var col = 0; col < gdGridSize; col++) {
            var name = prefix + index;

            var x = xOffset + col * gdSpacing;
            var y = (gdGridSize - 1 - row) * gdSpacing;

            if (!ggbApplet.exists(name)) {
                ggbApplet.evalCommand(
                    name + " = Circle((" +
                    x.toFixed(4) + ", " +
                    y.toFixed(4) + "), " +
                    gdCircleRadius + ")"
                );

                hideGDLabel(name);
            }

            setGDCellColour(name, population[index]);

            index++;
        }
    }
}

function updateGDText() {
    var total = gdGridSize * gdGridSize;

    var redCount = countRedAlleles(gdPopulation);
    var blueCount = total - redCount;
    var redFreq = redCount / total;

    try {
        if (ggbApplet.exists("GDTextCurrent")) {
            ggbApplet.deleteObject("GDTextCurrent");
        }

        var currentText =
            "Current gen " + gdGeneration +
            ":  Red " + redCount +
            "  Blue " + blueCount +
            "  f(red) " + redFreq.toFixed(3);

        ggbApplet.evalCommand(
            'GDTextCurrent = Text("' + currentText + '", (0, ' +
            (gdGridSize * gdSpacing + 0.8).toFixed(2) + '))'
        );

        hideGDLabel("GDTextCurrent");

    } catch (e) {}

    try {
        if (ggbApplet.exists("GDTextNext")) {
            ggbApplet.deleteObject("GDTextNext");
        }

        var nextText;

        if (gdNextPopulation.length === 0) {
            nextText = "Next gen: not yet sampled";
        } else {
            var nextRedCount = countRedAlleles(gdNextPopulation);
            var filledCount = 0;

            for (var i = 0; i < gdNextPopulation.length; i++) {
                if (gdNextPopulation[i] !== -1) {
                    filledCount++;
                }
            }

            var nextBlueCount = filledCount - nextRedCount;
            var nextRedFreq = 0;

            if (filledCount > 0) {
                nextRedFreq = nextRedCount / filledCount;
            }

            nextText =
                "Next gen: sampled " + filledCount + "/" + total +
                "  Red " + nextRedCount +
                "  Blue " + nextBlueCount +
                "  f(red) " + nextRedFreq.toFixed(3);
        }

        ggbApplet.evalCommand(
            'GDTextNext = Text("' + nextText + '", (' +
            gdNextGridX.toFixed(2) + ', ' +
            (gdGridSize * gdSpacing + 0.8).toFixed(2) + '))'
        );

        hideGDLabel("GDTextNext");

    } catch (e) {}

    updateGDFixationText();
}

function updateGDFixationText() {
    try {
        if (ggbApplet.exists("GDFixationText")) {
            ggbApplet.deleteObject("GDFixationText");
        }

        var message = getGDFixationMessage();

        if (message !== "") {
            ggbApplet.evalCommand(
                'GDFixationText = Text("' + message + '", (0, ' +
                (gdGridSize * gdSpacing + 1.8).toFixed(2) + '))'
            );

            hideGDLabel("GDFixationText");
            ggbApplet.setColor("GDFixationText", 160, 0, 0);
        }

    } catch (e) {}
}

function clearNextGenerationDisplay() {
    for (var i = ggbApplet.getObjectNumber() - 1; i >= 0; i--) {
        var obj = ggbApplet.getObjectName(i);

        if (
            obj.indexOf("GDNextCell") === 0 ||
            obj === "GDTextNext"
        ) {
            try {
                ggbApplet.deleteObject(obj);
            } catch (e) {}
        }
    }

    gdNextPopulation = [];
    gdSamplingIndex = 0;
    updateGDText();
}

function initialiseGeneticDriftGrid() {
    clearGeneticDriftGrid();

    gdGeneration = 0;
    gdPopulation = [];
    gdNextPopulation = [];
    gdFrequencyHistory = [];

    var total = gdGridSize * gdGridSize;
    var redCount = countRedAlleles(gdPopulation);
    gdFrequencyHistory.push(redCount / total);

    var total = gdGridSize * gdGridSize;

    for (var i = 0; i < total; i++) {
        if (Math.random() < gdInitialRedFrequency) {
            gdPopulation.push(1);
        } else {
            gdPopulation.push(0);
        }
    }

    drawGrid("GDCell", gdPopulation, 0);
    drawGDFrequencyPlot();
    updateGDText();
}

function sampleNextGeneration() {
    startNextGenerationSampling();

    var total = gdGridSize * gdGridSize;

    for (var i = 0; i < total; i++) {
        sampleOneMarble();
    }

    updateGDText();
}

function acceptNextGeneration() {
    var total = gdGridSize * gdGridSize;

    if (gdNextPopulation.length === 0) {
        return;
    }

    if (gdSamplingIndex < total) {
        return;
    }

    gdPopulation = gdNextPopulation.slice();
    gdNextPopulation = [];
    gdSamplingIndex = 0;
    gdGeneration++;

    var redCount = countRedAlleles(gdPopulation);
    gdFrequencyHistory.push(redCount / total);

    drawGrid("GDCell", gdPopulation, 0);
    clearNextGenerationDisplay();
    updateGDText();
    drawGDFrequencyPlot();
}

function stepGeneticDriftGrid() {
    sampleNextGeneration();
    acceptNextGeneration();
}

function clearGDFrequencyPlot() {
    
    for (var i = ggbApplet.getObjectNumber() - 1; i >= 0; i--) {
        try {
            var obj = ggbApplet.getObjectName(i);

            if (obj.indexOf("GDFreq") === 0) {
                ggbApplet.deleteObject(obj);
            }
        } catch (e) {}
    }
}

function drawGDFrequencyPlot() {
    clearGDFrequencyPlot();

    if (gdFrequencyHistory.length === 0) {
        return;
    }

    // Plot position and size
    var x0 = 0;
    var y0 = -8.5;
    var plotWidth = 39;
    var plotHeight = 6;

    var maxIndex = Math.max(1, gdFrequencyHistory.length - 1);

    // Frame and guide lines
    ggbApplet.evalCommand(
        "GDFreqAxisX = Segment((" + x0 + "," + y0 + "),(" + (x0 + plotWidth) + "," + y0 + "))"
    );
    ggbApplet.evalCommand(
        "GDFreqAxisY = Segment((" + x0 + "," + y0 + "),(" + x0 + "," + (y0 + plotHeight) + "))"
    );
    ggbApplet.evalCommand(
        "GDFreqTop = Segment((" + x0 + "," + (y0 + plotHeight) + "),(" + (x0 + plotWidth) + "," + (y0 + plotHeight) + "))"
    );
    ggbApplet.evalCommand(
        "GDFreqMid = Segment((" + x0 + "," + (y0 + plotHeight / 2) + "),(" + (x0 + plotWidth) + "," + (y0 + plotHeight / 2) + "))"
    );

    try {
        ggbApplet.setLabelVisible("GDFreqAxisX", false);
        ggbApplet.setLabelVisible("GDFreqAxisY", false);
        ggbApplet.setLabelVisible("GDFreqTop", false);
        ggbApplet.setLabelVisible("GDFreqMid", false);

        ggbApplet.setColor("GDFreqAxisX", 80, 80, 80);
        ggbApplet.setColor("GDFreqAxisY", 80, 80, 80);
        ggbApplet.setColor("GDFreqTop", 140, 180, 140);
        ggbApplet.setColor("GDFreqMid", 180, 180, 180);

        ggbApplet.setLineThickness("GDFreqAxisX", 2);
        ggbApplet.setLineThickness("GDFreqAxisY", 2);
        ggbApplet.setLineThickness("GDFreqTop", 1);
        ggbApplet.setLineThickness("GDFreqMid", 1);
    } catch (e) {}

    // Labels
    ggbApplet.evalCommand(
        'GDFreqLabelTitle = Text("Red frequency history", (' + (x0 + 0.5) + ',' + (y0 + plotHeight + 0.5) + '))'
    );
    ggbApplet.evalCommand(
        'GDFreqLabelTop = Text("1.0", (' + (x0 - 1.2) + ',' + (y0 + plotHeight - 0.2) + '))'
    );
    ggbApplet.evalCommand(
        'GDFreqLabelMid = Text("0.5", (' + (x0 - 1.2) + ',' + (y0 + plotHeight / 2 - 0.2) + '))'
    );
    ggbApplet.evalCommand(
        'GDFreqLabelBottom = Text("0.0", (' + (x0 - 1.2) + ',' + (y0 - 0.2) + '))'
    );
    ggbApplet.evalCommand(
        'GDFreqLabelX = Text("Generation", (' + (x0 + plotWidth / 2 - 2) + ',' + (y0 - 0.8) + '))'
    );

    try {
        ggbApplet.setLabelVisible("GDFreqLabelTitle", false);
        ggbApplet.setLabelVisible("GDFreqLabelTop", false);
        ggbApplet.setLabelVisible("GDFreqLabelMid", false);
        ggbApplet.setLabelVisible("GDFreqLabelBottom", false);
        ggbApplet.setLabelVisible("GDFreqLabelX", false);
    } catch (e) {}

    // Plot the line segments
    for (var i = 1; i < gdFrequencyHistory.length; i++) {
        var xPrev = x0 + plotWidth * (i - 1) / maxIndex;
        var yPrev = y0 + plotHeight * gdFrequencyHistory[i - 1];

        var xNow = x0 + plotWidth * i / maxIndex;
        var yNow = y0 + plotHeight * gdFrequencyHistory[i];

        var segName = "GDFreqSeg" + i;

        ggbApplet.evalCommand(
            segName + " = Segment((" +
            xPrev.toFixed(4) + "," + yPrev.toFixed(4) + "),(" +
            xNow.toFixed(4) + "," + yNow.toFixed(4) + "))"
        );

        try {
            ggbApplet.setLabelVisible(segName, false);
            ggbApplet.setColor(segName, 30, 30, 30);
            ggbApplet.setLineThickness(segName, 3);
        } catch (e) {}
    }

    // Final point
    var lastIndex = gdFrequencyHistory.length - 1;
    var xLast = x0 + plotWidth * lastIndex / maxIndex;
    var yLast = y0 + plotHeight * gdFrequencyHistory[lastIndex];

    ggbApplet.evalCommand(
        "GDFreqPoint = (" + xLast.toFixed(4) + "," + yLast.toFixed(4) + ")"
    );

    try {
        ggbApplet.setLabelVisible("GDFreqPoint", false);
        ggbApplet.setPointSize("GDFreqPoint", 5);
        ggbApplet.setColor("GDFreqPoint", 200, 0, 0);
    } catch (e) {}

    ggbApplet.evalCommand(
    'GDFreqGenLabel = Text("Generation ' + gdGeneration + '", (' +
    (x0 + plotWidth - 3.2).toFixed(4) + ',' +
    (y0 - 1.35).toFixed(4) + '))'
    );

    try {
        ggbApplet.setLabelVisible("GDFreqGenLabel", false);
        ggbApplet.setColor("GDFreqGenLabel", 80, 80, 80);
    } catch (e) {}
}

function runUntilFixation() {
    var total = gdGridSize * gdGridSize;
    var maxSteps = 5000;

    if (gdPopulation.length === 0) {
        initialiseGeneticDriftGrid();
    }

    for (var step = 0; step < maxSteps; step++) {
        var redCount = countRedAlleles(gdPopulation);

        if (redCount === 0 || redCount === total) {
            break;
        }

        var redFreq = redCount / total;
        var newPopulation = [];

        for (var i = 0; i < total; i++) {
            if (Math.random() < redFreq) {
                newPopulation.push(1);
            } else {
                newPopulation.push(0);
            }
        }

        gdPopulation = newPopulation;
        gdGeneration++;

        var newRedCount = countRedAlleles(gdPopulation);
        gdFrequencyHistory.push(newRedCount / total);
    }

    gdNextPopulation = [];

    drawGrid("GDCell", gdPopulation, 0);
    clearNextGenerationDisplay();
    updateGDText();
    drawGDFrequencyPlot();
}

function runGeneticDriftGridSteps(numberOfSteps) {
    var total = gdGridSize * gdGridSize;

    if (gdPopulation.length === 0) {
        initialiseGeneticDriftGrid();
    }

    for (var step = 0; step < numberOfSteps; step++) {
        var redCount = countRedAlleles(gdPopulation);

        if (redCount === 0 || redCount === total) {
            break;
        }

        var redFreq = redCount / total;
        var newPopulation = [];

        for (var i = 0; i < total; i++) {
            if (Math.random() < redFreq) {
                newPopulation.push(1);
            } else {
                newPopulation.push(0);
            }
        }

        gdPopulation = newPopulation;
        gdGeneration++;

        var newRedCount = countRedAlleles(gdPopulation);
        gdFrequencyHistory.push(newRedCount / total);
    }

    gdNextPopulation = [];

    drawGrid("GDCell", gdPopulation, 0);
    clearNextGenerationDisplay();
    updateGDText();
    drawGDFrequencyPlot();
}`;

const buttonInstructions =
`Create these GeoGebra buttons.

Button label:
Initialise grid

On Click JavaScript:
initialiseGeneticDriftGrid();

Button label:
Sample one allele

On Click JavaScript:
sampleOneGeneticDriftAllele();

Button label:
Sample 10 alleles

On Click JavaScript:
sampleTenGeneticDriftAlleles();

Button label:
Complete next generation

On Click JavaScript:
completeGeneticDriftNextGeneration();

Button label:
Accept generation

On Click JavaScript:
acceptGeneticDriftGeneration();

Button label:
Clear

On Click JavaScript:
clearGeneticDriftGrid();
`;

    setOutputs(commands, code, "", buttonInstructions);
}

function generateGeoGebraGeneticDriftBranchingAncestry() {

    function readNumber(id, fallback) {
        const element = document.getElementById(id);

        if (!element) {
            return fallback;
        }

        const value = Number(element.value);

        if (Number.isNaN(value)) {
            return fallback;
        }

        return value;
    }

    const populationSize = readNumber("gdbPopulationSize", 12);
    const initialRedFrequency = readNumber("gdbInitialRedFrequency", 0.5);
    const circleRadius = readNumber("gdbCircleRadius", 0.35);
    const spacing = readNumber("gdbSpacing", 1.2);
    const rowSeparation = readNumber("gdbRowSeparation", 4);

    let commands =
`// No GeoGebra Input Commands are required.
// This Genetic Drift Branching Ancestry model is built by Global JavaScript.`;

    let code =
`// --------------------------------------------------
// Genetic Drift: Branching Ancestry
// Fixed-size ancestry model
// --------------------------------------------------

var gdbPopulationSize = ${populationSize};
var gdbInitialRedFrequency = ${initialRedFrequency};
var gdbCircleRadius = ${circleRadius};
var gdbSpacing = ${spacing};
var gdbRowSeparation = ${rowSeparation};

var gdbGeneration = 0;
var gdbCurrentPopulation = [];
var gdbNextPopulation = [];
var gdbParentChoices = [];
var gdbLastAcceptMessage = "";
var gdbFrequencyHistory = [];

function clearGeneticDriftBranching() {
    for (var i = ggbApplet.getObjectNumber() - 1; i >= 0; i--) {
        var obj = ggbApplet.getObjectName(i);

        if (obj.indexOf("GDB") === 0) {
            try {
                ggbApplet.deleteObject(obj);
            } catch (e) {}
        }
    }
}

function hideGDBLabel(name) {
    try {
        ggbApplet.setLabelVisible(name, false);
    } catch (e) {}
}

function setGDBColour(name, allele) {
    try {
        if (allele === 1) {
            ggbApplet.setColor(name, 220, 40, 40);   // red
        } else {
            ggbApplet.setColor(name, 40, 80, 220);   // blue
        }

        ggbApplet.setFilling(name, 0.9);
    } catch (e) {}
}

function countGDBRed(population) {
    var redCount = 0;

    for (var i = 0; i < population.length; i++) {
        if (population[i] === 1) {
            redCount++;
        }
    }

    return redCount;
}

function getGDBFixationMessage() {
    if (gdbCurrentPopulation.length === 0) {
        return "";
    }

    var redCount = countGDBRed(gdbCurrentPopulation);

    if (redCount === 0) {
        return "Red allele lost at generation " + gdbGeneration + ".";
    }

    if (redCount === gdbPopulationSize) {
        return "Red allele fixed at generation " + gdbGeneration + ".";
    }

    return "";
}

function drawGDBCircle(name, x, y, allele) {
    if (!ggbApplet.exists(name)) {
        ggbApplet.evalCommand(
            name + " = Circle((" +
            x.toFixed(4) + ", " +
            y.toFixed(4) + "), " +
            gdbCircleRadius + ")"
        );

        hideGDBLabel(name);
    }

    setGDBColour(name, allele);
}

function updateGDBText() {
    var currentRed = countGDBRed(gdbCurrentPopulation);
    var currentBlue = gdbPopulationSize - currentRed;
    var currentFreq = currentRed / gdbPopulationSize;
    var fixationText = getGDBFixationMessage();

    var nextText = "Next generation: not yet sampled";
    var driftText = "";

    var acceptText = "";

    if (gdbLastAcceptMessage !== "") {
        acceptText = gdbLastAcceptMessage;
    }

    if (gdbNextPopulation.length > 0) {
        var nextRed = countGDBRed(gdbNextPopulation);
        var nextBlue = gdbPopulationSize - nextRed;
        var nextFreq = nextRed / gdbPopulationSize;

        nextText =
            "Next generation: Red " + nextRed +
            "  Blue " + nextBlue +
            "  f(red) " + nextFreq.toFixed(3);

        if (nextRed > currentRed) {
            driftText = "Chance increased the red frequency in this sampled generation.";
        } else if (nextRed < currentRed) {
            driftText = "Chance decreased the red frequency in this sampled generation.";
        } else {
            driftText = "Chance left the red frequency unchanged in this sampled generation.";
        }
        acceptText = "Click Accept next generation to make the lower row become the new current generation.";
    }

    try {
        if (ggbApplet.exists("GDBTextCurrent")) {
            ggbApplet.deleteObject("GDBTextCurrent");
        }

        if (ggbApplet.exists("GDBTextNext")) {
            ggbApplet.deleteObject("GDBTextNext");
        }

        if (ggbApplet.exists("GDBTextExplanation")) {
            ggbApplet.deleteObject("GDBTextExplanation");
        }

        if (driftText !== "") {
            ggbApplet.evalCommand(
            'GDBTextDrift = Text("' + driftText + '", (0, ' +
            (-gdbRowSeparation - 1.7).toFixed(4) + '))'
        );
    }

        if (ggbApplet.exists("GDBTextAccept")) {
            ggbApplet.deleteObject("GDBTextAccept");
        }

        if (ggbApplet.exists("GDBTextFixation")) {
            ggbApplet.deleteObject("GDBTextFixation");
        }

        var currentText =
            "Generation " + gdbGeneration +
            ": Red " + currentRed +
            "  Blue " + currentBlue +
            "  f(red) " + currentFreq.toFixed(3);

        ggbApplet.evalCommand(
            'GDBTextCurrent = Text("' + currentText + '", (0, 1.6))'
        );

        ggbApplet.evalCommand(
            'GDBTextNext = Text("' + nextText + '", (0, ' +
            (-gdbRowSeparation - 1.0).toFixed(4) + '))'
        );

        ggbApplet.evalCommand(
            'GDBTextDrift = Text("' + driftText + '", (0, ' +
            (-gdbRowSeparation - 1.7).toFixed(4) + '))'
        );

        if (acceptText !== "") {
            ggbApplet.evalCommand(
            'GDBTextAccept = Text("' + acceptText + '", (0, ' +
            (-gdbRowSeparation - 2.5).toFixed(4) + '))'
        );

        if (fixationText !== "") {
            ggbApplet.evalCommand(
            'GDBTextFixation = Text("' + fixationText + '", (0, ' +
            (-gdbRowSeparation - 3.3).toFixed(4) + '))'
            );
        }
    }

        ggbApplet.evalCommand(
            'GDBTextExplanation = Text("Each lower circle randomly chooses an upper source copy and inherits its colour.", (0, ' +
            (-gdbRowSeparation - 4.1).toFixed(4) + '))'
        );

        hideGDBLabel("GDBTextCurrent");
        hideGDBLabel("GDBTextNext");
        hideGDBLabel("GDBTextDrift");
        hideGDBLabel("GDBTextAccept");
        hideGDBLabel("GDBTextFixation");
        hideGDBLabel("GDBTextExplanation");

        try {
            ggbApplet.setColor("GDBTextDrift", 140, 80, 160);
        } catch (e) {}

        try {
            ggbApplet.setColor("GDBTextAccept", 60, 100, 160);
        } catch (e) {}

        try {
            ggbApplet.setColor("GDBTextFixation", 180, 40, 40);
        } catch (e) {}
        
    } catch (e) {}
}

function drawGDBFrequencyPlot() {

    for (var i = ggbApplet.getObjectNumber() - 1; i >= 0; i--) {
        var obj = ggbApplet.getObjectName(i);

        if (obj.indexOf("GDBFreq") === 0) {
            try {
                ggbApplet.deleteObject(obj);
            } catch (e) {}
        }
    }

    if (gdbFrequencyHistory.length === 0) {
        return;
    }

    var x0 = 0;
    var y0 = -gdbRowSeparation - 9.5;
    var plotWidth = Math.max(8, (gdbPopulationSize - 1) * gdbSpacing);
    var plotHeight = 3.0;

    ggbApplet.evalCommand(
        "GDBFreqAxisX = Segment((" +
        x0.toFixed(4) + "," + y0.toFixed(4) + "),(" +
        (x0 + plotWidth).toFixed(4) + "," + y0.toFixed(4) + "))"
    );

    ggbApplet.evalCommand(
        "GDBFreqAxisY = Segment((" +
        x0.toFixed(4) + "," + y0.toFixed(4) + "),(" +
        x0.toFixed(4) + "," + (y0 + plotHeight).toFixed(4) + "))"
    );

    ggbApplet.evalCommand(
        "GDBFreqTop = Segment((" +
        x0.toFixed(4) + "," + (y0 + plotHeight).toFixed(4) + "),(" +
        (x0 + plotWidth).toFixed(4) + "," + (y0 + plotHeight).toFixed(4) + "))"
    );

    ggbApplet.evalCommand(
        "GDBFreqMid = Segment((" +
        x0.toFixed(4) + "," + (y0 + plotHeight * 0.5).toFixed(4) + "),(" +
        (x0 + plotWidth).toFixed(4) + "," + (y0 + plotHeight * 0.5).toFixed(4) + "))"
    );

    try {
        ggbApplet.setColor("GDBFreqAxisX", 80, 80, 80);
        ggbApplet.setColor("GDBFreqAxisY", 80, 80, 80);
        ggbApplet.setColor("GDBFreqTop", 190, 190, 190);
        ggbApplet.setColor("GDBFreqMid", 210, 210, 210);

        ggbApplet.setLineThickness("GDBFreqAxisX", 2);
        ggbApplet.setLineThickness("GDBFreqAxisY", 2);
        ggbApplet.setLineThickness("GDBFreqTop", 1);
        ggbApplet.setLineThickness("GDBFreqMid", 1);

        hideGDBLabel("GDBFreqAxisX");
        hideGDBLabel("GDBFreqAxisY");
        hideGDBLabel("GDBFreqTop");
        hideGDBLabel("GDBFreqMid");
    } catch (e) {}

    ggbApplet.evalCommand(
        'GDBFreqTitle = Text("Red frequency history", (' +
        x0.toFixed(4) + "," + (y0 + plotHeight + 0.25).toFixed(4) + '))'
    );

    ggbApplet.evalCommand(
        'GDBFreqZero = Text("0", (' +
        (x0 - 0.45).toFixed(4) + "," + (y0 - 0.1).toFixed(4) + '))'
    );

    ggbApplet.evalCommand(
        'GDBFreqHalf = Text("0.5", (' +
        (x0 - 0.75).toFixed(4) + "," + (y0 + plotHeight * 0.5 - 0.1).toFixed(4) + '))'
    );

    ggbApplet.evalCommand(
        'GDBFreqOne = Text("1", (' +
        (x0 - 0.45).toFixed(4) + "," + (y0 + plotHeight - 0.1).toFixed(4) + '))'
    );

    try {
        hideGDBLabel("GDBFreqTitle");
        hideGDBLabel("GDBFreqZero");
        hideGDBLabel("GDBFreqHalf");
        hideGDBLabel("GDBFreqOne");

        ggbApplet.setColor("GDBFreqTitle", 80, 80, 80);
        ggbApplet.setColor("GDBFreqZero", 80, 80, 80);
        ggbApplet.setColor("GDBFreqHalf", 80, 80, 80);
        ggbApplet.setColor("GDBFreqOne", 80, 80, 80);
    } catch (e) {}

    if (gdbFrequencyHistory.length === 1) {
        var px = x0;
        var py = y0 + gdbFrequencyHistory[0] * plotHeight;

        ggbApplet.evalCommand(
            "GDBFreqPoint0 = (" +
            px.toFixed(4) + "," +
            py.toFixed(4) + ")"
        );

        try {
            ggbApplet.setColor("GDBFreqPoint0", 220, 40, 40);
            ggbApplet.setPointSize("GDBFreqPoint0", 5);
            hideGDBLabel("GDBFreqPoint0");
        } catch (e) {}

        return;
    }

    for (var j = 0; j < gdbFrequencyHistory.length - 1; j++) {

        var x1 = x0 + plotWidth * j / Math.max(1, gdbFrequencyHistory.length - 1);
        var y1 = y0 + gdbFrequencyHistory[j] * plotHeight;

        var x2 = x0 + plotWidth * (j + 1) / Math.max(1, gdbFrequencyHistory.length - 1);
        var y2 = y0 + gdbFrequencyHistory[j + 1] * plotHeight;

        var segName = "GDBFreqSeg" + j;

        ggbApplet.evalCommand(
            segName + " = Segment((" +
            x1.toFixed(4) + "," +
            y1.toFixed(4) + "),(" +
            x2.toFixed(4) + "," +
            y2.toFixed(4) + "))"
        );

        try {
            ggbApplet.setColor(segName, 220, 40, 40);
            ggbApplet.setLineThickness(segName, 3);
            hideGDBLabel(segName);
        } catch (e) {}
    }

    var lastIndex = gdbFrequencyHistory.length - 1;
    var lastX = x0 + plotWidth;
    var lastY = y0 + gdbFrequencyHistory[lastIndex] * plotHeight;

    ggbApplet.evalCommand(
        "GDBFreqPointLast = (" +
        lastX.toFixed(4) + "," +
        lastY.toFixed(4) + ")"
    );

    try {
        ggbApplet.setColor("GDBFreqPointLast", 220, 40, 40);
        ggbApplet.setPointSize("GDBFreqPointLast", 5);
        hideGDBLabel("GDBFreqPointLast");
    } catch (e) {}
}

function initialiseGeneticDriftBranching() {
    clearGeneticDriftBranching();

    gdbGeneration = 0;
    gdbCurrentPopulation = [];
    gdbNextPopulation = [];
    gdbParentChoices = [];
    gdbLastAcceptMessage = "";
    gdbFrequencyHistory = [];

    for (var i = 0; i < gdbPopulationSize; i++) {
        if (Math.random() < gdbInitialRedFrequency) {
            gdbCurrentPopulation.push(1);
        } else {
            gdbCurrentPopulation.push(0);
        }
    }

    var initialRed = countGDBRed(gdbCurrentPopulation);
    gdbFrequencyHistory.push(initialRed / gdbPopulationSize);

    drawGDBCurrentGeneration();
    updateGDBText();
    drawGDBFrequencyPlot();
}

function drawGDBCurrentGeneration() {
    var startX = 0;
    var y = 0.5;

    for (var i = 0; i < gdbPopulationSize; i++) {
        var x = startX + i * gdbSpacing;
        drawGDBCircle("GDBCurrent" + i, x, y, gdbCurrentPopulation[i]);
    }
}

function drawGDBNextGeneration() {
    var startX = 0;
    var y = -gdbRowSeparation;

    for (var i = 0; i < gdbPopulationSize; i++) {
        var x = startX + i * gdbSpacing;
        drawGDBCircle("GDBNext" + i, x, y, gdbNextPopulation[i]);
    }
}

function drawGDBAncestryLines() {

    for (var i = ggbApplet.getObjectNumber() - 1; i >= 0; i--) {
        var obj = ggbApplet.getObjectName(i);

        if (obj.indexOf("GDBLine") === 0) {
            try {
                ggbApplet.deleteObject(obj);
            } catch (e) {}
        }
    }

    for (var child = 0; child < gdbParentChoices.length; child++) {

        var parent = gdbParentChoices[child];

        var lineName = "GDBLine" + child;

        var x1 = parent * gdbSpacing;
        var y1 = 0.5;

        var x2 = child * gdbSpacing;
        var y2 = -gdbRowSeparation;

        ggbApplet.evalCommand(
            lineName + " = Segment((" +
            x1.toFixed(4) + ", " +
            y1.toFixed(4) + "), (" +
            x2.toFixed(4) + ", " +
            y2.toFixed(4) + "))"
        );

        hideGDBLabel(lineName);

        try {
            ggbApplet.setColor(lineName, 145, 145, 145);
            ggbApplet.setLineThickness(lineName, 2);
        } catch (e) {}
    }
}

function sampleGDBNextGeneration() {
    if (gdbCurrentPopulation.length === 0) {
        initialiseGeneticDriftBranching();
    }

    gdbNextPopulation = [];
    gdbParentChoices = [];
    gdbLastAcceptMessage = "";

    for (var child = 0; child < gdbPopulationSize; child++) {
        var parent = Math.floor(Math.random() * gdbPopulationSize);
        var allele = gdbCurrentPopulation[parent];

        gdbParentChoices.push(parent);
        gdbNextPopulation.push(allele);
    }

    drawGDBNextGeneration();
    drawGDBAncestryLines();
    updateGDBText();
}

function acceptGDBNextGeneration() {
    if (gdbNextPopulation.length === 0) {
        return;
    }

    gdbCurrentPopulation = gdbNextPopulation.slice();
    gdbNextPopulation = [];
    gdbParentChoices = [];
    gdbGeneration++;
    gdbLastAcceptMessage =
    "The sampled lower row is now Generation " + gdbGeneration + ".";

    var redCount = countGDBRed(gdbCurrentPopulation);
    gdbFrequencyHistory.push(redCount / gdbPopulationSize);

    clearGeneticDriftBranching();

    drawGDBCurrentGeneration();
    updateGDBText();
    drawGDBFrequencyPlot();
}

function stepGDBGeneration() {
    sampleGDBNextGeneration();
    acceptGDBNextGeneration();
}
    
function runGDBGenerations(numberOfGenerations) {

    if (gdbCurrentPopulation.length === 0) {
        initialiseGeneticDriftBranching();
    }

    for (var i = 0; i < numberOfGenerations; i++) {

        var fixationText = getGDBFixationMessage();

        if (fixationText !== "") {
            break;
        }

        sampleGDBNextGeneration();
        acceptGDBNextGeneration();
    }

    updateGDBText();
    drawGDBFrequencyPlot();
}
    
function runGDBUntilFixation() {

    if (gdbCurrentPopulation.length === 0) {
        initialiseGeneticDriftBranching();
    }

    var maxSteps = 1000;

    for (var i = 0; i < maxSteps; i++) {

        var fixationText = getGDBFixationMessage();

        if (fixationText !== "") {
            break;
        }

        sampleGDBNextGeneration();
        acceptGDBNextGeneration();
    }

    updateGDBText();
    drawGDBFrequencyPlot();
}`;

const buttonInstructions =
`Create these GeoGebra buttons.

Button label:
Initialise

On Click JavaScript:
initialiseGeneticDriftBranching();

Button label:
Sample next generation

On Click JavaScript:
sampleGDBNextGeneration();

Button label:
Accept generation

On Click JavaScript:
acceptGDBNextGeneration();

Button label:
Step one generation

On Click JavaScript:
stepGDBGeneration();

Button label:
Run 10 generations

On Click JavaScript:
runGDBGenerations(10);

Button label:
Run until fixation

On Click JavaScript:
runGDBUntilFixation();

Button label:
Clear

On Click JavaScript:
clearGeneticDriftBranching();
`;
    setOutputs(commands, code, blenderCode, buttonInstructions);
}